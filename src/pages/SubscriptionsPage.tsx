import { useEffect, useState } from 'react'
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Input,
  Select,
  Modal,
  Form,
  message,
  Popconfirm,
  Badge,
  Statistic,
  Row,
  Col,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  PauseCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import type { Subscription } from '../types'
import type { FunctionRequirement } from '../types/requirements'
import type { PublishedEvent } from '../types'
import RequirementTooltip from '../components/RequirementTooltip'
import { getRequirementsByFunctionIds } from '../utils/requirementsHelper'

const { Search } = Input
const { Option } = Select

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('全部')
  const [searchText, setSearchText] = useState('')
  const [requirements, setRequirements] = useState<FunctionRequirement[]>([])
  const [publishedEvents, setPublishedEvents] = useState<PublishedEvent[]>([])
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 加载订阅数据
        const [subscriptionRes, eventsRes] = await Promise.all([
          fetch('/data/subscriptions.json'),
          fetch('/data/published-events.json')
        ])
        
        const subscriptionsData = await subscriptionRes.json()
        const eventsData = await eventsRes.json()
        
        setSubscriptions(subscriptionsData)
        setFilteredSubscriptions(subscriptionsData)
        
        // 筛选已发布的事件
        const publishedEventsData = eventsData.filter((event: PublishedEvent) => event.status === '已发布')
        setPublishedEvents(publishedEventsData)

        // 加载需求数据
        const reqs = await getRequirementsByFunctionIds(['F021', 'F022', 'F023', 'F024', 'F025'])
        setRequirements(reqs)
      } catch (error) {
        console.error('加载数据失败:', error)
        message.error('加载订阅数据失败')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    let filtered = subscriptions
    if (selectedStatus !== '全部') {
      filtered = filtered.filter((s) => s.status === selectedStatus)
    }
    if (searchText) {
      filtered = filtered.filter(
        (s) =>
          s.eventName.toLowerCase().includes(searchText.toLowerCase()) ||
          s.subscriber.toLowerCase().includes(searchText.toLowerCase()) ||
          s.eventId.toLowerCase().includes(searchText.toLowerCase())
      )
    }
    setFilteredSubscriptions(filtered)
  }, [selectedStatus, searchText, subscriptions])

  const handleAdd = () => {
    setEditingSubscription(null)
    form.resetFields()
    // 设置默认状态为启动
    form.setFieldsValue({ status: '启动' })
    setModalVisible(true)
  }

  const handleEventIdChange = (eventId: string) => {
    const selectedEvent = publishedEvents.find(event => event.eventId === eventId)
    if (selectedEvent) {
      form.setFieldsValue({
        eventName: selectedEvent.name
      })
    }
  }

  const handleEdit = (record: Subscription) => {
    setEditingSubscription(record)
    form.setFieldsValue(record)
    setModalVisible(true)
  }

  const handleDelete = (id: string) => {
    setSubscriptions(subscriptions.filter((s) => s.id !== id))
    message.success('删除成功')
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      if (editingSubscription) {
        setSubscriptions(
          subscriptions.map((s) =>
            s.id === editingSubscription.id ? { ...s, ...values } : s
          )
        )
        message.success('更新成功')
      } else {
        const newSubscription: Subscription = {
          id: `sub-${Date.now()}`,
          ...values,
          subscribeDate: new Date().toISOString(),
          successCount: 0,
          failureCount: 0,
        }
        setSubscriptions([newSubscription, ...subscriptions])
        message.success('创建成功')
      }
      setModalVisible(false)
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  const statusColorMap: Record<string, string> = {
    启动: 'success',
    暂停: 'warning',
  }

  const activeCount = subscriptions.filter((s) => s.status === '启动').length
  const pausedCount = subscriptions.filter((s) => s.status === '暂停').length
  const totalSuccess = subscriptions.reduce((sum, s) => sum + s.successCount, 0)
  const totalFailure = subscriptions.reduce((sum, s) => sum + s.failureCount, 0)

  const columns = [
    {
      title: '订阅者',
      dataIndex: 'subscriber',
      key: 'subscriber',
      width: 180,
      fixed: 'left' as const,
    },
    {
      title: '事件名称',
      dataIndex: 'eventName',
      key: 'eventName',
      width: 150,
    },
    {
      title: '事件ID',
      dataIndex: 'eventId',
      key: 'eventId',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Badge
          status={
            status === '启动'
              ? 'success'
              : status === '暂停'
              ? 'warning'
              : 'default'
          }
          text={status}
        />
      ),
    },
    {
      title: '推送方式',
      dataIndex: 'pushMethod',
      key: 'pushMethod',
      width: 120,
      render: (method: string) => <Tag color="blue">{method}</Tag>,
    },
    {
      title: '端点地址',
      dataIndex: 'endpoint',
      key: 'endpoint',
      width: 250,
      ellipsis: true,
    },
    {
      title: '过滤条件',
      dataIndex: 'filterCondition',
      key: 'filterCondition',
      width: 200,
      ellipsis: true,
    },
    {
      title: '成功次数',
      dataIndex: 'successCount',
      key: 'successCount',
      width: 100,
      sorter: (a: Subscription, b: Subscription) => a.successCount - b.successCount,
      render: (count: number) => (
        <span style={{ color: '#52c41a' }}>{count.toLocaleString()}</span>
      ),
    },
    {
      title: '失败次数',
      dataIndex: 'failureCount',
      key: 'failureCount',
      width: 100,
      sorter: (a: Subscription, b: Subscription) => a.failureCount - b.failureCount,
      render: (count: number) => (
        <span style={{ color: count > 0 ? '#ff4d4f' : '#666' }}>
          {count.toLocaleString()}
        </span>
      ),
    },
    {
      title: '订阅时间',
      dataIndex: 'subscribeDate',
      key: 'subscribeDate',
      width: 180,
      render: (date: string) => new Date(date).toLocaleString('zh-CN'),
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right' as const,
      width: 180,
      render: (_: unknown, record: Subscription) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除此订阅吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card bordered={false} style={{ marginBottom: -8 }}>
        <Space align="center">
          <span style={{ fontSize: 16, fontWeight: 500 }}>订阅统计</span>
          <RequirementTooltip
            functionIds={['F021', 'F022', 'F023', 'F024', 'F025']}
            requirements={requirements}
          />
        </Space>
      </Card>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="启动订阅"
              value={activeCount}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="暂停订阅"
              value={pausedCount}
              valueStyle={{ color: '#faad14' }}
              prefix={<PauseCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="总成功推送"
              value={totalSuccess}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Search
              placeholder="搜索事件名称、订阅者或事件ID"
              allowClear
              style={{ width: 350 }}
              onSearch={setSearchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
            <Select
              value={selectedStatus}
              onChange={setSelectedStatus}
              style={{ width: 150 }}
            >
              <Option value="全部">全部状态</Option>
              <Option value="启动">启动</Option>
              <Option value="暂停">暂停</Option>
            </Select>
          </Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增订阅
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredSubscriptions}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
          scroll={{ x: 1800 }}
        />
      </Card>

      <Modal
        title={editingSubscription ? '编辑订阅' : '新增订阅'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={700}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="subscriber"
            label="订阅者名称"
            rules={[{ required: true, message: '请输入订阅者名称' }]}
          >
            <Input placeholder="例如: 生产监控系统" />
          </Form.Item>
          <Form.Item
            name="eventId"
            label="事件ID"
            rules={[{ required: true, message: '请选择事件ID' }]}
          >
            <Select
              placeholder="请选择已发布的事件"
              showSearch
              optionFilterProp="children"
              onChange={handleEventIdChange}
            >
              {publishedEvents.map((event) => (
                <Option key={event.eventId} value={event.eventId}>
                  {event.eventId} - {event.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="eventName"
            label="事件名称"
            rules={[{ required: true, message: '请输入事件名称' }]}
          >
            <Input placeholder="例如: 常压蒸馏事件" />
          </Form.Item>
          <Form.Item
            name="pushMethod"
            label="推送方式"
            rules={[{ required: true, message: '请选择推送方式' }]}
          >
            <Select>
              <Option value="Webhook">Webhook</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="endpoint"
            label="端点地址"
            rules={[{ required: true, message: '请输入端点地址' }]}
          >
            <Input placeholder="例如: https://api.example.com/webhook" />
          </Form.Item>
          <Form.Item
            name="filterCondition"
            label="过滤条件"
            tooltip="留空表示订阅所有事件"
          >
            <Input placeholder="例如: temperature > 350" />
          </Form.Item>
          <Form.Item
            name="retryStrategy"
            label="重试策略"
            rules={[{ required: true, message: '请输入重试策略' }]}
          >
            <Input placeholder="例如: 指数退避，最多重试3次" />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Option value="启动">启动</Option>
              <Option value="暂停">暂停</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  )
}
