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
  DatePicker,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import type { PublishedEvent } from '../types'

const { Search } = Input
const { Option } = Select

export default function EventsPage() {
  const [events, setEvents] = useState<PublishedEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<PublishedEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingEvent, setEditingEvent] = useState<PublishedEvent | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('全部')
  const [searchText, setSearchText] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/published-events.json')
        const data = await response.json()
        setEvents(data)
        setFilteredEvents(data)
      } catch (error) {
        console.error('加载数据失败:', error)
        message.error('加载事件数据失败')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    let filtered = events
    if (selectedStatus !== '全部') {
      filtered = filtered.filter((e) => e.status === selectedStatus)
    }
    if (searchText) {
      filtered = filtered.filter(
        (e) =>
          e.name.toLowerCase().includes(searchText.toLowerCase()) ||
          e.eventId.toLowerCase().includes(searchText.toLowerCase()) ||
          e.category.toLowerCase().includes(searchText.toLowerCase())
      )
    }
    setFilteredEvents(filtered)
  }, [selectedStatus, searchText, events])

  const handleAdd = () => {
    setEditingEvent(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record: PublishedEvent) => {
    setEditingEvent(record)
    form.setFieldsValue(record)
    setModalVisible(true)
  }

  const handleDelete = (id: string) => {
    setEvents(events.filter((e) => e.id !== id))
    message.success('删除成功')
  }

  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的事件')
      return
    }
    Modal.confirm({
      title: '批量删除确认',
      content: `确定要删除选中的 ${selectedRowKeys.length} 个事件吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setEvents(events.filter((e) => !selectedRowKeys.includes(e.id)))
        setSelectedRowKeys([])
        message.success(`成功删除 ${selectedRowKeys.length} 个事件`)
      },
    })
  }

  const handleBatchPublish = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要发布的事件')
      return
    }
    setEvents(
      events.map((e) =>
        selectedRowKeys.includes(e.id)
          ? { ...e, status: '已发布', publishDate: new Date().toISOString() }
          : e
      )
    )
    setSelectedRowKeys([])
    message.success(`成功发布 ${selectedRowKeys.length} 个事件`)
  }

  const handleBatchDisable = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要停用的事件')
      return
    }
    setEvents(
      events.map((e) =>
        selectedRowKeys.includes(e.id) ? { ...e, status: '已停用' } : e
      )
    )
    setSelectedRowKeys([])
    message.success(`成功停用 ${selectedRowKeys.length} 个事件`)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys)
    },
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      if (editingEvent) {
        setEvents(
          events.map((e) => (e.id === editingEvent.id ? { ...e, ...values } : e))
        )
        message.success('更新成功')
      } else {
        const newEvent: PublishedEvent = {
          id: `evt-${Date.now()}`,
          ...values,
          subscribers: 0,
          lastTrigger: null,
        }
        setEvents([newEvent, ...events])
        message.success('创建成功')
      }
      setModalVisible(false)
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  const statusColorMap: Record<string, string> = {
    草稿: 'default',
    已发布: 'success',
    已停用: 'error',
  }

  const columns = [
    {
      title: '事件ID',
      dataIndex: 'eventId',
      key: 'eventId',
      width: 220,
      fixed: 'left' as const,
    },
    {
      title: '事件名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (category: string) => {
        const colorMap: Record<string, string> = {
          生产事件: 'blue',
          安全事件: 'red',
          库存事件: 'orange',
          采购事件: 'green',
          销售事件: 'purple',
        }
        return <Tag color={colorMap[category] || 'default'}>{category}</Tag>
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={statusColorMap[status] || 'default'}>{status}</Tag>
      ),
    },
    {
      title: '发布者',
      dataIndex: 'publisher',
      key: 'publisher',
      width: 100,
    },
    {
      title: '订阅数',
      dataIndex: 'subscribers',
      key: 'subscribers',
      width: 100,
      sorter: (a: PublishedEvent, b: PublishedEvent) => a.subscribers - b.subscribers,
    },
    {
      title: '发布时间',
      dataIndex: 'publishDate',
      key: 'publishDate',
      width: 180,
      render: (date: string | null) =>
        date ? new Date(date).toLocaleString('zh-CN') : '-',
    },
    {
      title: '最后触发',
      dataIndex: 'lastTrigger',
      key: 'lastTrigger',
      width: 180,
      render: (date: string | null) =>
        date ? new Date(date).toLocaleString('zh-CN') : '-',
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right' as const,
      width: 200,
      render: (_: unknown, record: PublishedEvent) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => message.info('查看详情功能开发中')}
          >
            详情
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除此事件吗？"
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
      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Space>
              <Search
                placeholder="搜索事件名称、ID或分类"
                allowClear
                style={{ width: 300 }}
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
                <Option value="草稿">草稿</Option>
                <Option value="已发布">已发布</Option>
                <Option value="已停用">已停用</Option>
              </Select>
            </Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              新增事件
            </Button>
          </Space>

          {selectedRowKeys.length > 0 && (
            <Space>
              <span style={{ color: '#666' }}>
                已选择 <strong style={{ color: '#1890ff' }}>{selectedRowKeys.length}</strong> 项
              </span>
              <Button onClick={handleBatchPublish}>批量发布</Button>
              <Button onClick={handleBatchDisable}>批量停用</Button>
              <Button danger onClick={handleBatchDelete}>
                批量删除
              </Button>
              <Button
                type="link"
                onClick={() => setSelectedRowKeys([])}
                style={{ padding: 0 }}
              >
                取消选择
              </Button>
            </Space>
          )}
        </Space>

        <Table
          columns={columns}
          dataSource={filteredEvents}
          rowKey="id"
          loading={loading}
          rowSelection={rowSelection}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
          scroll={{ x: 1400 }}
          style={{ marginTop: 16 }}
        />
      </Card>

      <Modal
        title={editingEvent ? '编辑事件' : '新增事件'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={600}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="eventId"
            label="事件ID"
            rules={[{ required: true, message: '请输入事件ID' }]}
          >
            <Input placeholder="例如: SAP_REFINE_ATMOS_DIST" />
          </Form.Item>
          <Form.Item
            name="name"
            label="事件名称"
            rules={[{ required: true, message: '请输入事件名称' }]}
          >
            <Input placeholder="例如: 常压蒸馏事件" />
          </Form.Item>
          <Form.Item
            name="category"
            label="分类"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select>
              <Option value="生产事件">生产事件</Option>
              <Option value="安全事件">安全事件</Option>
              <Option value="库存事件">库存事件</Option>
              <Option value="采购事件">采购事件</Option>
              <Option value="销售事件">销售事件</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <Input.TextArea rows={3} placeholder="事件描述信息" />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Option value="草稿">草稿</Option>
              <Option value="已发布">已发布</Option>
              <Option value="已停用">已停用</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="publisher"
            label="发布者"
            rules={[{ required: true, message: '请输入发布者' }]}
          >
            <Input placeholder="发布者姓名" />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  )
}
