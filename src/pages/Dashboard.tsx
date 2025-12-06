import { useEffect, useState } from 'react'
import { Card, Row, Col, Statistic, Table, Tag, Space } from 'antd'
import {
  RiseOutlined,
  FallOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  SendOutlined,
} from '@ant-design/icons'
import type { PublishedEvent, EventLog } from '../types'
import type { FunctionRequirement } from '../types/requirements'
import RequirementTooltip from '../components/RequirementTooltip'
import { getRequirementsByFunctionIds } from '../utils/requirementsHelper'

export default function Dashboard() {
  const [events, setEvents] = useState<PublishedEvent[]>([])
  const [logs, setLogs] = useState<EventLog[]>([])
  const [loading, setLoading] = useState(true)
  const [requirements, setRequirements] = useState<FunctionRequirement[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, logsRes] = await Promise.all([
          fetch('/data/published-events.json'),
          fetch('/data/event-logs.json'),
        ])
        const eventsData = await eventsRes.json()
        const logsData = await logsRes.json()
        setEvents(eventsData)
        setLogs(logsData)

        // 加载需求数据
        const reqs = await getRequirementsByFunctionIds(['F031', 'F036'])
        setRequirements(reqs)
      } catch (error) {
        console.error('加载数据失败:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const publishedCount = events.filter((e) => e.status === '已发布').length
  const totalSubscribers = events.reduce((sum, e) => sum + e.subscribers, 0)
  const todayLogs = logs.filter((log) => {
    const logDate = new Date(log.triggerTime).toDateString()
    const today = new Date().toDateString()
    return logDate === today
  })
  const successRate =
    logs.length > 0
      ? ((logs.filter((l) => l.status === '成功').length / logs.length) * 100).toFixed(1)
      : '0'

  const recentLogsColumns = [
    {
      title: '事件名称',
      dataIndex: 'eventName',
      key: 'eventName',
      width: 200,
    },
    {
      title: '触发时间',
      dataIndex: 'triggerTime',
      key: 'triggerTime',
      width: 180,
      render: (time: string) => new Date(time).toLocaleString('zh-CN'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === '成功' ? 'success' : 'error'} icon={status === '成功' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}>
          {status}
        </Tag>
      ),
    },
    {
      title: '订阅者',
      dataIndex: 'subscribers',
      key: 'subscribers',
      width: 100,
    },
    {
      title: '成功推送',
      dataIndex: 'successPush',
      key: 'successPush',
      width: 100,
      render: (count: number) => (
        <span style={{ color: '#52c41a' }}>{count}</span>
      ),
    },
    {
      title: '失败推送',
      dataIndex: 'failedPush',
      key: 'failedPush',
      width: 100,
      render: (count: number) => (
        <span style={{ color: count > 0 ? '#ff4d4f' : '#666' }}>{count}</span>
      ),
    },
    {
      title: '处理时间',
      dataIndex: 'processingTime',
      key: 'processingTime',
      width: 100,
    },
  ]

  const activeEventsColumns = [
    {
      title: '事件名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (category: string) => {
        const colorMap: Record<string, string> = {
          生产管理事件: 'blue',
          成本会计事件: 'red',
          财务会计事件: 'orange',
          采购管理事件: 'green',
          销售分销事件: 'purple',
        }
        return <Tag color={colorMap[category] || 'default'}>{category}</Tag>
      },
    },
    {
      title: '订阅数',
      dataIndex: 'subscribers',
      key: 'subscribers',
      width: 100,
      sorter: (a: PublishedEvent, b: PublishedEvent) => a.subscribers - b.subscribers,
    },
    {
      title: '最后触发',
      dataIndex: 'lastTrigger',
      key: 'lastTrigger',
      width: 180,
      render: (time: string | null) =>
        time ? new Date(time).toLocaleString('zh-CN') : '-',
    },
  ]

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card bordered={false} style={{ marginBottom: -8 }}>
        <Space align="center">
          <span style={{ fontSize: 16, fontWeight: 500 }}>系统运行状态</span>
          <RequirementTooltip
            functionIds={['F031', 'F036']}
            requirements={requirements}
          />
        </Space>
      </Card>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="已发布事件"
              value={publishedCount}
              suffix={`/ ${events.length}`}
              valueStyle={{ color: '#1890ff' }}
              prefix={<SendOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总订阅数"
              value={totalSubscribers}
              valueStyle={{ color: '#52c41a' }}
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日触发"
              value={todayLogs.length}
              valueStyle={{ color: '#faad14' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="成功率"
              value={successRate}
              suffix="%"
              valueStyle={{ color: Number(successRate) >= 95 ? '#52c41a' : '#faad14' }}
              prefix={Number(successRate) >= 95 ? <CheckCircleOutlined /> : <WarningOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="最近事件日志" extra={<a href="/logs">查看全部</a>}>
        <Table
          columns={recentLogsColumns}
          dataSource={logs.slice(0, 5)}
          rowKey="id"
          loading={loading}
          pagination={false}
          scroll={{ x: 900 }}
        />
      </Card>

      <Card title="活跃事件" extra={<a href="/events">查看全部</a>}>
        <Table
          columns={activeEventsColumns}
          dataSource={events.filter((e) => e.status === '已发布').slice(0, 5)}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </Card>
    </Space>
  )
}
