import {
  Card,
  Form,
  Input,
  Button,
  Space,
  Select,
  Switch,
  InputNumber,
  message,
  Divider,
  Typography,
} from 'antd'
import { SaveOutlined, SettingOutlined } from '@ant-design/icons'

const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input

export default function SettingsPage() {
  const [form] = Form.useForm()

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      console.log('保存设置:', values)
      message.success('设置已保存')
    } catch (error) {
      console.error('表单验证失败:', error)
      message.error('保存失败，请检查输入')
    }
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Title level={4}>
          <SettingOutlined style={{ marginRight: 8 }} />
          系统配置
        </Title>
        <Text type="secondary">配置业务事件中心的全局参数和行为</Text>
      </Card>

      <Card title="基本设置">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            systemName: '企业中间件业务事件中心',
            environment: 'production',
            enableLogging: true,
            logLevel: 'info',
            maxRetries: 3,
            retryInterval: 30,
            eventTimeout: 60,
            enableNotification: true,
          }}
        >
          <Form.Item
            name="systemName"
            label="系统名称"
            rules={[{ required: true, message: '请输入系统名称' }]}
          >
            <Input placeholder="输入系统名称" />
          </Form.Item>

          <Form.Item
            name="environment"
            label="运行环境"
            rules={[{ required: true, message: '请选择运行环境' }]}
          >
            <Select>
              <Option value="development">开发环境</Option>
              <Option value="testing">测试环境</Option>
              <Option value="staging">预发布环境</Option>
              <Option value="production">生产环境</Option>
            </Select>
          </Form.Item>

          <Divider />

          <Title level={5}>事件处理配置</Title>

          <Form.Item name="eventTimeout" label="事件处理超时时间（秒）">
            <InputNumber min={10} max={300} style={{ width: 200 }} />
          </Form.Item>

          <Form.Item name="maxRetries" label="最大重试次数">
            <InputNumber min={0} max={10} style={{ width: 200 }} />
          </Form.Item>

          <Form.Item name="retryInterval" label="重试间隔（秒）">
            <InputNumber min={5} max={300} style={{ width: 200 }} />
          </Form.Item>

          <Divider />

          <Title level={5}>日志配置</Title>

          <Form.Item
            name="enableLogging"
            label="启用日志记录"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item name="logLevel" label="日志级别">
            <Select style={{ width: 200 }}>
              <Option value="debug">Debug</Option>
              <Option value="info">Info</Option>
              <Option value="warn">Warning</Option>
              <Option value="error">Error</Option>
            </Select>
          </Form.Item>

          <Divider />

          <Title level={5}>通知配置</Title>

          <Form.Item
            name="enableNotification"
            label="启用事件通知"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item name="notificationEmail" label="通知邮箱">
            <Input placeholder="admin@company.com" type="email" />
          </Form.Item>

          <Form.Item name="webhookUrl" label="Webhook地址">
            <Input placeholder="https://api.example.com/webhook" />
          </Form.Item>

          <Divider />

          <Title level={5}>高级配置</Title>

          <Form.Item name="customConfig" label="自定义配置（JSON）">
            <TextArea
              rows={6}
              placeholder={`{
  "customField1": "value1",
  "customField2": "value2"
}`}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
                保存设置
              </Button>
              <Button onClick={() => form.resetFields()}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card title="关于">
        <Space direction="vertical">
          <div>
            <Text strong>系统版本：</Text>
            <Text>v1.0.0</Text>
          </div>
          <div>
            <Text strong>构建日期：</Text>
            <Text>2025-11-30</Text>
          </div>
          <div>
            <Text strong>技术栈：</Text>
            <Text>React 18 + TypeScript + Ant Design 6.0 + Vite</Text>
          </div>
          <div>
            <Text strong>说明：</Text>
            <Text>企业中间件业务事件管理平台，用于SAP ERP石油化工业务事件的注册、发布和订阅管理</Text>
          </div>
        </Space>
      </Card>
    </Space>
  )
}
