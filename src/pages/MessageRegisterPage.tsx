import { useEffect } from 'react'
import { Card, Form, Input, Select, Button, Space, message } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'

const { TextArea } = Input
const { Option } = Select

export default function MessageRegisterPage() {
  const [form] = Form.useForm()
  const [params] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const defaults = {
      topic: params.get('topic') || '',
      eventId: params.get('eventId') || '',
      eventName: params.get('eventName') || '',
      endpoint: '',
      pushMethod: 'Webhook',
      description: '',
      payloadSchema: '{\n  "temperature": "number"\n}'
    }
    form.setFieldsValue(defaults)
  }, [params, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      let payloadSchema
      try {
        payloadSchema = JSON.parse(values.payloadSchema || '{}')
      } catch {
        message.error('数据结构需为合法JSON')
        return
      }
      const record = {
        id: `msg-${Date.now()}`,
        topic: values.topic,
        eventId: values.eventId,
        eventName: values.eventName,
        endpoint: values.endpoint,
        pushMethod: values.pushMethod,
        description: values.description,
        payloadSchema,
        templateId: params.get('templateId') || null,
        createdAt: new Date().toISOString(),
      }
      const key = 'messageRegistrations'
      const list = JSON.parse(localStorage.getItem(key) || '[]')
      list.unshift(record)
      localStorage.setItem(key, JSON.stringify(list))
      message.success('消息已登记')
      navigate('/subjects')
    } catch (e) {
      message.error('请完善必填项')
    }
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title="消息登记">
        <Form form={form} layout="vertical">
          <Form.Item name="topic" label="消息主题" rules={[{ required: true, message: '请输入消息主题' }]}> 
            <Input placeholder="例如：常压蒸馏事件" />
          </Form.Item>
          <Form.Item name="eventId" label="事件ID" rules={[{ required: true, message: '请输入事件ID' }]}> 
            <Input placeholder="例如：SAP_REFINE_ATMOS_DIST" />
          </Form.Item>
          <Form.Item name="eventName" label="事件名称" rules={[{ required: true, message: '请输入事件名称' }]}> 
            <Input placeholder="例如：常压蒸馏事件" />
          </Form.Item>
          <Form.Item name="pushMethod" label="推送方式" rules={[{ required: true, message: '请选择推送方式' }]}> 
            <Select>
              <Option value="Webhook">Webhook</Option>
              <Option value="HTTP API">HTTP API</Option>
              <Option value="消息队列">消息队列</Option>
              <Option value="邮件">邮件</Option>
            </Select>
          </Form.Item>
          <Form.Item name="endpoint" label="端点地址" rules={[{ required: true, message: '请输入端点地址' }]}> 
            <Input placeholder="例如：https://api.example.com/webhook" />
          </Form.Item>
          <Form.Item name="description" label="描述"> 
            <TextArea rows={3} placeholder="登记说明" />
          </Form.Item>
          <Form.Item name="payloadSchema" label="数据结构（JSON）"> 
            <TextArea rows={6} placeholder='{"temperature":"number"}' />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" onClick={handleSubmit}>保存</Button>
              <Button onClick={() => navigate('/subjects')}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  )
}

