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
  Descriptions,
  message,
  Tabs,
  Popconfirm,
} from 'antd'
import {
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  FileTextOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import type { EventTemplate } from '../types'
import type { FunctionRequirement } from '../types/requirements'
import RequirementTooltip from '../components/RequirementTooltip'
import { getRequirementsByFunctionIds } from '../utils/requirementsHelper'

const { Search } = Input
const { Option } = Select

export default function SubjectsPage() {
  const [templates, setTemplates] = useState<EventTemplate[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<EventTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')
  const [searchText, setSearchText] = useState('')
  const [detailModalVisible, setDetailModalVisible] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<EventTemplate | null>(null)
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [requirements, setRequirements] = useState<FunctionRequirement[]>([])
  const [messageParameters, setMessageParameters] = useState<Array<{
    id: string
    name: string
    type: string
    required: string
  }>>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/event-templates.json')
        const data = await response.json()
        setTemplates(data)
        setFilteredTemplates(data)

        // 加载需求数据
        const reqs = await getRequirementsByFunctionIds(['F001', 'F002', 'F003', 'F004', 'F005'])
        setRequirements(reqs)
      } catch (error) {
        console.error('加载数据失败:', error)
        message.error('加载事件模板失败')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    let filtered = templates
    if (selectedCategory !== '全部') {
      filtered = filtered.filter((t) => t.category === selectedCategory)
    }
    if (searchText) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(searchText.toLowerCase()) ||
          t.eventId.toLowerCase().includes(searchText.toLowerCase()) ||
          t.description.toLowerCase().includes(searchText.toLowerCase())
      )
    }
    setFilteredTemplates(filtered)
  }, [selectedCategory, searchText, templates])

  const categories = ['全部', ...new Set(templates.map((t) => t.category))]

  const priorityColorMap: Record<string, string> = {
    紧急: 'red',
    高: 'orange',
    中: 'blue',
    低: 'default',
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
      title: '业务分类',
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
      title: '子分类',
      dataIndex: 'subcategory',
      key: 'subcategory',
      width: 120,
    },
    {
      title: '业务域',
      dataIndex: 'businessDomain',
      key: 'businessDomain',
      width: 120,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: (priority: string) => (
        <Tag color={priorityColorMap[priority] || 'default'}>{priority}</Tag>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 250,
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right' as const,
      width: 150,
      render: (_: unknown, record: EventTemplate) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedTemplate(record)
              setDetailModalVisible(true)
            }}
          >
            查看详情
          </Button>
        </Space>
      ),
    },
  ]

  const subcategoryData = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = []
    }
    if (!acc[template.category].includes(template.subcategory)) {
      acc[template.category].push(template.subcategory)
    }
    return acc
  }, {} as Record<string, string[]>)

  const tabItems = categories.map((category) => ({
    key: category,
    label: `${category} ${category !== '全部' ? `(${templates.filter((t) => t.category === category).length})` : `(${templates.length})`}`,
    children: (
      <div>
        {category !== '全部' && subcategoryData[category] && (
          <div style={{ marginBottom: 16 }}>
            <Space wrap>
              {subcategoryData[category].map((sub) => (
                <Tag key={sub} color="blue">
                  {sub}: {templates.filter((t) => t.subcategory === sub).length}个模板
                </Tag>
              ))}
            </Space>
          </div>
        )}
      </div>
    ),
  }))

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 16, fontWeight: 500 }}>
              <FileTextOutlined style={{ marginRight: 8 }} />
              SAP ERP 石油化工业务事件模板库
            </div>
            <RequirementTooltip
              functionIds={['F001', 'F002', 'F003', 'F004', 'F005']}
              requirements={requirements}
            />
          </Space>
          <div style={{ color: '#666', fontSize: 14 }}>
            本模板库包含SAP ERP系统中常见的石油化工行业业务事件，涵盖生产、采购、销售、库存和安全等多个业务领域。
            选择合适的模板可以快速创建业务事件配置。
          </div>
        </Space>
      </Card>

      <Card>
        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Search
              placeholder="搜索事件名称、ID或描述"
              allowClear
              style={{ width: 300 }}
              onSearch={setSearchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              style={{ width: 150 }}
            >
              {categories.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
            </Select>
          </Space>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            登记业务事件
          </Button>
        </Space>

        <Tabs
          activeKey={selectedCategory}
          onChange={setSelectedCategory}
          items={tabItems}
        />

        <Table
          columns={columns}
          dataSource={filteredTemplates}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 个模板`,
          }}
          scroll={{ x: 1400 }}
        />
      </Card>

      <Modal
        title="事件模板详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>,
          <Button
            key="use"
            type="primary"
            onClick={() => {
              message.success('已基于模板创建事件配置')
              setDetailModalVisible(false)
            }}
          >
            使用此模板
          </Button>,
        ]}
        width={800}
      >
        {selectedTemplate && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="事件ID" span={2}>
              <code>{selectedTemplate.eventId}</code>
            </Descriptions.Item>
            <Descriptions.Item label="事件名称">
              {selectedTemplate.name}
            </Descriptions.Item>
            <Descriptions.Item label="优先级">
              <Tag color={priorityColorMap[selectedTemplate.priority]}>
                {selectedTemplate.priority}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="业务分类">
              {selectedTemplate.category}
            </Descriptions.Item>
            <Descriptions.Item label="子分类">
              {selectedTemplate.subcategory}
            </Descriptions.Item>
            <Descriptions.Item label="业务域" span={2}>
              {selectedTemplate.businessDomain}
            </Descriptions.Item>
            <Descriptions.Item label="描述" span={2}>
              {selectedTemplate.description}
            </Descriptions.Item>
            <Descriptions.Item label="触发条件" span={2}>
              {selectedTemplate.triggerCondition}
            </Descriptions.Item>
            <Descriptions.Item label="使用场景" span={2}>
              {selectedTemplate.usageScenario}
            </Descriptions.Item>
            <Descriptions.Item label="数据结构" span={2}>
              <pre style={{ margin: 0, background: '#f5f5f5', padding: 12, borderRadius: 4 }}>
                {JSON.stringify(selectedTemplate.dataStructure, null, 2)}
              </pre>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        title="登记业务事件"
        open={createModalVisible}
        onCancel={() => {
          setCreateModalVisible(false)
          form.resetFields()
          setMessageParameters([])
        }}
        footer={[
          <Button key="cancel" onClick={() => {
            setCreateModalVisible(false)
            form.resetFields()
            setMessageParameters([])
          }}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              form.validateFields().then((values) => {
                // 确保消息参数数据是完整的
                const formData = {
                  ...values,
                  messageParameters: messageParameters.filter(param => param.name.trim() !== '')
                }
                console.log('表单数据:', formData)
                message.success('业务事件登记成功')
                setCreateModalVisible(false)
                form.resetFields()
                setMessageParameters([])
              }).catch((error) => {
                console.error('表单验证失败:', error)
              })
            }}
          >
            提交
          </Button>,
        ]}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            priority: '中',
            category: '生产事件'
          }}
        >
          <Form.Item
            label="事件ID"
            name="eventId"
            rules={[
              { required: true, message: '请输入事件ID' },
              { pattern: /^[A-Z][A-Z0-9_]+$/, message: '事件ID必须以大写字母开头，只能包含大写字母、数字和下划线' }
            ]}
          >
            <Input placeholder="例如: SAP_REFINE_NEW_EVENT" />
          </Form.Item>

          <Form.Item
            label="事件名称"
            name="name"
            rules={[
              { required: true, message: '请输入事件名称' },
              { min: 2, max: 50, message: '事件名称长度必须在2-50个字符之间' }
            ]}
          >
            <Input placeholder="请输入业务事件名称" />
          </Form.Item>

          <Form.Item
            label="业务分类"
            name="category"
            rules={[{ required: true, message: '请选择业务分类' }]}
          >
            <Select placeholder="请选择业务分类">
              {categories.filter(cat => cat !== '全部').map((cat) => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="子分类"
            name="subcategory"
            rules={[{ required: true, message: '请输入子分类' }]}
          >
            <Input placeholder="例如: 常压蒸馏、催化裂化等" />
          </Form.Item>

          <Form.Item
            label="业务域"
            name="businessDomain"
            rules={[{ required: true, message: '请输入业务域' }]}
          >
            <Input placeholder="例如: SAP ERP石油化工、精馏工艺等" />
          </Form.Item>

          <Form.Item
            label="优先级"
            name="priority"
            rules={[{ required: true, message: '请选择优先级' }]}
          >
            <Select>
              <Option value="紧急">紧急</Option>
              <Option value="高">高</Option>
              <Option value="中">中</Option>
              <Option value="低">低</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="描述"
            name="description"
            rules={[
              { required: true, message: '请输入事件描述' },
              { min: 10, max: 200, message: '描述长度必须在10-200个字符之间' }
            ]}
          >
            <Input.TextArea 
              placeholder="请详细描述该业务事件的用途和影响范围" 
              rows={3}
            />
          </Form.Item>

          <Form.Item
            label="触发条件"
            name="triggerCondition"
            rules={[
              { required: true, message: '请输入触发条件' },
              { min: 10, message: '触发条件描述至少需要10个字符' }
            ]}
          >
            <Input.TextArea 
              placeholder="详细描述触发该事件的具体条件，如数值阈值、状态变更等" 
              rows={3}
            />
          </Form.Item>

          <Form.Item
            label="使用场景"
            name="usageScenario"
            rules={[
              { required: true, message: '请输入使用场景' },
              { min: 10, message: '使用场景描述至少需要10个字符' }
            ]}
          >
            <Input.TextArea 
              placeholder="描述该事件在业务流程中的应用场景和业务价值" 
              rows={3}
            />
          </Form.Item>

          <Form.Item
            label="消息参数"
            name="messageParameters"
            rules={[
              { required: true, message: '请配置消息参数' },
              {
                validator: (_, value) => {
                  if (!value || value.length === 0) {
                    return Promise.reject('请至少添加一个消息参数')
                  }
                  
                  // 验证每个参数
                  for (let i = 0; i < value.length; i++) {
                    const param = value[i]
                    if (!param.name || param.name.trim() === '') {
                      return Promise.reject(`第${i + 1}个参数名称不能为空`)
                    }
                    if (!param.type) {
                      return Promise.reject(`第${i + 1}个参数类型不能为空`)
                    }
                    if (!param.required) {
                      return Promise.reject(`第${i + 1}个参数必填字段不能为空`)
                    }
                  }
                  
                  return Promise.resolve()
                }
              }
            ]}
          >
            <div style={{ border: '1px solid #d9d9d9', borderRadius: 6, padding: 16 }}>
              {/* 表头 */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr 1fr 80px', 
                gap: '16px',
                padding: '8px 0',
                borderBottom: '1px solid #f0f0f0',
                fontWeight: 500,
                color: '#666',
                marginBottom: '8px'
              }}>
                <div>参数名</div>
                <div>类型</div>
                <div>必填</div>
                <div>操作</div>
              </div>
              
              {/* 参数列表 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {messageParameters.map((param, index) => (
                  <div 
                    key={param.id}
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '2fr 1fr 1fr 80px', 
                      gap: '16px',
                      alignItems: 'center',
                      padding: '4px 0'
                    }}
                  >
                    {/* 参数名输入框 */}
                    <Input
                      placeholder="如 vessel"
                      value={param.name}
                      onChange={(e) => {
                        const newParams = [...messageParameters]
                        newParams[index].name = e.target.value
                        setMessageParameters(newParams)
                        form.setFieldsValue({ messageParameters: newParams })
                      }}
                    />
                    
                    {/* 类型下拉选择 */}
                    <Select
                      value={param.type}
                      onChange={(value) => {
                        const newParams = [...messageParameters]
                        newParams[index].type = value
                        setMessageParameters(newParams)
                        form.setFieldsValue({ messageParameters: newParams })
                      }}
                    >
                      <Option value="string">string</Option>
                      <Option value="integer">integer</Option>
                      <Option value="number">number</Option>
                      <Option value="boolean">boolean</Option>
                      <Option value="array">array</Option>
                      <Option value="object">object</Option>
                    </Select>
                    
                    {/* 必填下拉选择 */}
                    <Select
                      value={param.required}
                      onChange={(value) => {
                        const newParams = [...messageParameters]
                        newParams[index].required = value
                        setMessageParameters(newParams)
                        form.setFieldsValue({ messageParameters: newParams })
                      }}
                    >
                      <Option value="是">是</Option>
                      <Option value="否">否</Option>
                    </Select>
                    
                    {/* 删除按钮 */}
                    <Popconfirm
                      title="确定要删除这个参数吗？"
                      onConfirm={() => {
                        const newParams = messageParameters.filter((_, i) => i !== index)
                        setMessageParameters(newParams)
                        form.setFieldsValue({ messageParameters: newParams })
                      }}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button 
                        type="text" 
                        danger 
                        size="small" 
                        icon={<DeleteOutlined />}
                        style={{ width: 32, height: 32 }}
                      />
                    </Popconfirm>
                  </div>
                ))}
                
                {/* 空状态提示 */}
                {messageParameters.length === 0 && (
                  <div style={{ 
                    textAlign: 'center', 
                    color: '#999', 
                    padding: '20px 0',
                    fontSize: '14px'
                  }}>
                    暂无消息参数，请点击"添加参数"按钮进行配置
                  </div>
                )}
              </div>
              
              {/* 添加参数按钮 */}
              <div style={{ marginTop: '16px', textAlign: 'right' }}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    const newParam = {
                      id: Date.now().toString(),
                      name: '',
                      type: 'string',
                      required: '是'
                    }
                    const newParams = [...messageParameters, newParam]
                    setMessageParameters(newParams)
                    form.setFieldsValue({ messageParameters: newParams })
                  }}
                >
                  添加参数
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  )
}
