import { useEffect, useState } from 'react'
import {
  Card,
  Table,
  Space,
  Tag,
  Input,
  Select,
  DatePicker,
  Button,
  Modal,
  Descriptions,
  Badge,
} from 'antd'
import {
  SearchOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import type { EventLog } from '../types'
import dayjs from 'dayjs'

const { Search } = Input
const { Option } = Select
const { RangePicker } = DatePicker

export default function LogsPage() {
  const [logs, setLogs] = useState<EventLog[]>([])
  const [filteredLogs, setFilteredLogs] = useState<EventLog[]>([])
  const [loading, setLoading] = useState(true)
  const [detailModalVisible, setDetailModalVisible] = useState(false)
  const [selectedLog, setSelectedLog] = useState<EventLog | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('全部')
  const [searchText, setSearchText] = useState('')
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(
    null
  )

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    setLoading(true)
    try {
      const response = await fetch('/data/event-logs.json')
      const data = await response.json()
      setLogs(data)
      setFilteredLogs(data)
    } catch (error) {
      console.error('加载数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = logs
    if (selectedStatus !== '全部') {
      filtered = filtered.filter((log) => log.status === selectedStatus)
    }
    if (searchText) {
      filtered = filtered.filter(
        (log) =>
          log.eventName.toLowerCase().includes(searchText.toLowerCase()) ||
          log.eventId.toLowerCase().includes(searchText.toLowerCase())
      )
    }
    if (dateRange && dateRange[0] && dateRange[1]) {
      filtered = filtered.filter((log) => {
        const logDate = dayjs(log.triggerTime)
        return logDate.isAfter(dateRange[0]) && logDate.isBefore(dateRange[1])
      })
    }
    setFilteredLogs(filtered)
  }, [selectedStatus, searchText, dateRange, logs])

  const columns = [
    {
      title: '触发时间',
      dataIndex: 'triggerTime',
      key: 'triggerTime',
      width: 180,
      fixed: 'left' as const,
      sorter: (a: EventLog, b: EventLog) =>
        new Date(a.triggerTime).getTime() - new Date(b.triggerTime).getTime(),
      defaultSortOrder: 'descend' as const,
      render: (time: string) => new Date(time).toLocaleString('zh-CN'),
    },
    {
      title: '事件名称',
      dataIndex: 'eventName',
      key: 'eventName',
      width: 180,
    },
    {
      title: '事件ID',
      dataIndex: 'eventId',
      key: 'eventId',
      width: 220,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Badge
          status={status === '成功' ? 'success' : 'error'}
          text={status}
        />
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
        <span style={{ color: '#52c41a', fontWeight: 500 }}>{count}</span>
      ),
    },
    {
      title: '失败推送',
      dataIndex: 'failedPush',
      key: 'failedPush',
      width: 100,
      render: (count: number) => (
        <span
          style={{
            color: count > 0 ? '#ff4d4f' : '#666',
            fontWeight: count > 0 ? 500 : 'normal',
          }}
        >
          {count}
        </span>
      ),
    },
    {
      title: '处理时间',
      dataIndex: 'processingTime',
      key: 'processingTime',
      width: 100,
      sorter: (a: EventLog, b: EventLog) =>
        parseInt(a.processingTime) - parseInt(b.processingTime),
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right' as const,
      width: 120,
      render: (_: unknown, record: EventLog) => (
        <Button
          type="link"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedLog(record)
            setDetailModalVisible(true)
          }}
        >
          查看详情
        </Button>
      ),
    },
  ]

  const successCount = logs.filter((log) => log.status === '成功').length
  const failureCount = logs.filter((log) => log.status === '失败').length
  const totalPushSuccess = logs.reduce((sum, log) => sum + log.successPush, 0)
  const totalPushFailure = logs.reduce((sum, log) => sum + log.failedPush, 0)

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Space size="large">
          <div>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>总事件数</div>
            <div style={{ fontSize: 24, fontWeight: 600 }}>{logs.length}</div>
          </div>
          <div>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>成功事件</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: '#52c41a' }}>
              {successCount}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>失败事件</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: '#ff4d4f' }}>
              {failureCount}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>成功推送</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: '#1890ff' }}>
              {totalPushSuccess}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>失败推送</div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: totalPushFailure > 0 ? '#ff4d4f' : '#666',
              }}
            >
              {totalPushFailure}
            </div>
          </div>
        </Space>
      </Card>

      <Card>
        <Space style={{ marginBottom: 16, width: '100%' }} wrap>
          <Search
            placeholder="搜索事件名称或ID"
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
            <Option value="成功">成功</Option>
            <Option value="失败">失败</Option>
          </Select>
          <RangePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            onChange={(dates) => setDateRange(dates)}
            style={{ width: 400 }}
          />
          <Button icon={<ReloadOutlined />} onClick={fetchLogs}>
            刷新
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredLogs}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 15,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
          scroll={{ x: 1400 }}
        />
      </Card>

      <Modal
        title="事件日志详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>,
        ]}
        width={800}
      >
        {selectedLog && (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="事件ID" span={2}>
                <code>{selectedLog.eventId}</code>
              </Descriptions.Item>
              <Descriptions.Item label="事件名称">
                {selectedLog.eventName}
              </Descriptions.Item>
              <Descriptions.Item label="触发时间">
                {new Date(selectedLog.triggerTime).toLocaleString('zh-CN')}
              </Descriptions.Item>
              <Descriptions.Item label="处理状态">
                <Badge
                  status={selectedLog.status === '成功' ? 'success' : 'error'}
                  text={selectedLog.status}
                />
              </Descriptions.Item>
              <Descriptions.Item label="处理时间">
                {selectedLog.processingTime}
              </Descriptions.Item>
              <Descriptions.Item label="订阅者数量">
                {selectedLog.subscribers}
              </Descriptions.Item>
              <Descriptions.Item label="成功推送">
                <span style={{ color: '#52c41a', fontWeight: 500 }}>
                  {selectedLog.successPush}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="失败推送">
                <span
                  style={{
                    color: selectedLog.failedPush > 0 ? '#ff4d4f' : '#666',
                    fontWeight: selectedLog.failedPush > 0 ? 500 : 'normal',
                  }}
                >
                  {selectedLog.failedPush}
                </span>
              </Descriptions.Item>
              {selectedLog.errorMessage && (
                <Descriptions.Item label="错误信息" span={2}>
                  <span style={{ color: '#ff4d4f' }}>{selectedLog.errorMessage}</span>
                </Descriptions.Item>
              )}
            </Descriptions>

            <Card title="事件载荷（Payload）" size="small">
              <pre
                style={{
                  margin: 0,
                  background: '#f5f5f5',
                  padding: 16,
                  borderRadius: 4,
                  maxHeight: 300,
                  overflow: 'auto',
                }}
              >
                {JSON.stringify(selectedLog.payload, null, 2)}
              </pre>
            </Card>
          </Space>
        )}
      </Modal>
    </Space>
  )
}
