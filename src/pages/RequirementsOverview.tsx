import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  Row,
  Col,
  Menu,
  Typography,
  Descriptions,
  Tag,
  Space,
  Button,
  Input,
  Spin,
  Empty,
  Divider,
} from 'antd'
import {
  FileTextOutlined,
  RightOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons'
import type { RequirementsData, ModuleRequirement, FunctionRequirement } from '../types/requirements'
import { loadRequirements, functionToRouteMap } from '../utils/requirementsHelper'

const { Title, Paragraph, Text } = Typography

export default function RequirementsOverview() {
  const [requirementsData, setRequirementsData] = useState<RequirementsData | null>(null)
  const [selectedModule, setSelectedModule] = useState<string>('')
  const [selectedFunction, setSelectedFunction] = useState<FunctionRequirement | null>(null)
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadRequirements()
      if (data) {
        setRequirementsData(data)
        if (data.modules.length > 0) {
          setSelectedModule(data.modules[0].moduleId)
        }
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" tip="加载需求数据中..." />
      </div>
    )
  }

  if (!requirementsData) {
    return (
      <Empty
        description="需求数据加载失败"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    )
  }

  const currentModule = requirementsData.modules.find(
    (m) => m.moduleId === selectedModule
  )

  const filteredFunctions = currentModule?.functions.filter((f) =>
    searchText
      ? f.functionName.toLowerCase().includes(searchText.toLowerCase()) ||
        f.functionId.toLowerCase().includes(searchText.toLowerCase()) ||
        f.description.toLowerCase().includes(searchText.toLowerCase())
      : true
  )

  const menuItems = requirementsData.modules.map((module) => ({
    key: module.moduleId,
    label: module.moduleName,
    icon: <FolderOpenOutlined />,
  }))

  const handleFunctionClick = (func: FunctionRequirement) => {
    setSelectedFunction(func)
  }

  const handleNavigateToPage = (functionId: string) => {
    const route = functionToRouteMap[functionId]
    if (route) {
      navigate(route)
    }
  }

  return (
    <div>
      <Card bordered={false} style={{ marginBottom: 16 }}>
        <Space direction="vertical" size={0} style={{ width: '100%' }}>
          <Title level={3} style={{ margin: 0 }}>
            需求总纲
          </Title>
          <Text type="secondary">{requirementsData.projectName}</Text>
        </Space>
      </Card>

      <Row gutter={16}>
        <Col span={6}>
          <Card
            title={
              <Space>
                <FileTextOutlined />
                <span>功能模块</span>
              </Space>
            }
            bordered={false}
            style={{ height: 'calc(100vh - 240px)' }}
            bodyStyle={{ padding: 0, height: 'calc(100% - 57px)', overflowY: 'auto' }}
          >
            <Menu
              mode="inline"
              selectedKeys={[selectedModule]}
              items={menuItems}
              onClick={({ key }) => {
                setSelectedModule(key)
                setSelectedFunction(null)
                setSearchText('')
              }}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card
            title="功能列表"
            extra={
              <Input
                placeholder="搜索功能..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 200 }}
                allowClear
              />
            }
            bordered={false}
            style={{ height: 'calc(100vh - 240px)' }}
            bodyStyle={{ padding: '12px', height: 'calc(100% - 57px)', overflowY: 'auto' }}
          >
            {filteredFunctions && filteredFunctions.length > 0 ? (
              <Space direction="vertical" size={8} style={{ width: '100%' }}>
                {filteredFunctions.map((func) => (
                  <Card
                    key={func.functionId}
                    size="small"
                    hoverable
                    onClick={() => handleFunctionClick(func)}
                    style={{
                      cursor: 'pointer',
                      border:
                        selectedFunction?.functionId === func.functionId
                          ? '1px solid #1890ff'
                          : '1px solid #f0f0f0',
                      backgroundColor:
                        selectedFunction?.functionId === func.functionId
                          ? '#e6f7ff'
                          : 'white',
                    }}
                  >
                    <Space direction="vertical" size={4} style={{ width: '100%' }}>
                      <Space>
                        <Tag color="processing">{func.functionId}</Tag>
                        <Text strong>{func.functionName}</Text>
                      </Space>
                      <Text type="secondary" style={{ fontSize: 12 }} ellipsis>
                        {func.description}
                      </Text>
                    </Space>
                  </Card>
                ))}
              </Space>
            ) : (
              <Empty description="暂无功能数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Card>
        </Col>

        <Col span={10}>
          <Card
            title="需求详情"
            bordered={false}
            style={{ height: 'calc(100vh - 240px)' }}
            bodyStyle={{ padding: '16px', height: 'calc(100% - 57px)', overflowY: 'auto' }}
          >
            {selectedFunction ? (
              <div>
                <Space style={{ marginBottom: 16 }}>
                  <Tag color="processing" style={{ fontSize: 14 }}>
                    {selectedFunction.functionId}
                  </Tag>
                  <Title level={4} style={{ margin: 0 }}>
                    {selectedFunction.functionName}
                  </Title>
                </Space>

                <Divider style={{ margin: '16px 0' }} />

                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label="所属模块">
                    <Space>
                      <FolderOpenOutlined />
                      <span>{currentModule?.moduleName}</span>
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="功能描述">
                    <Paragraph style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                      {selectedFunction.description}
                    </Paragraph>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <Space>
                        <CheckCircleOutlined style={{ color: '#52c41a' }} />
                        <span>验收标准</span>
                      </Space>
                    }
                  >
                    <Paragraph style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                      {selectedFunction.acceptanceCriteria}
                    </Paragraph>
                  </Descriptions.Item>
                  {selectedFunction.notes && (
                    <Descriptions.Item label="需求说明">
                      <Paragraph style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                        {selectedFunction.notes}
                      </Paragraph>
                    </Descriptions.Item>
                  )}
                </Descriptions>

                {functionToRouteMap[selectedFunction.functionId] && (
                  <div style={{ marginTop: 16, textAlign: 'right' }}>
                    <Button
                      type="primary"
                      icon={<RightOutlined />}
                      onClick={() =>
                        handleNavigateToPage(selectedFunction.functionId)
                      }
                    >
                      查看功能页面
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Empty
                description="请从左侧选择功能查看详情"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}
