import { useState } from 'react'
import { Button, Modal, Descriptions, Tag, Space, Typography } from 'antd'
import { FileTextOutlined, CheckCircleOutlined } from '@ant-design/icons'
import type { FunctionRequirement } from '../types/requirements'

const { Title, Paragraph } = Typography

interface RequirementTooltipProps {
  functionIds: string[]
  requirements: FunctionRequirement[]
  buttonText?: string
  buttonSize?: 'small' | 'middle' | 'large'
  buttonType?: 'default' | 'primary' | 'dashed' | 'text' | 'link'
}

export default function RequirementTooltip({
  functionIds,
  requirements,
  buttonText = '查看需求',
  buttonSize = 'small',
  buttonType = 'link',
}: RequirementTooltipProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  if (requirements.length === 0) {
    return null
  }

  return (
    <>
      <Button
        type={buttonType}
        size={buttonSize}
        icon={<FileTextOutlined />}
        onClick={showModal}
      >
        {buttonText}
      </Button>
      <Modal
        title={
          <Space>
            <FileTextOutlined style={{ color: '#1890ff' }} />
            <span>功能需求详情</span>
            <Tag color="blue">{functionIds.length}个功能点</Tag>
          </Space>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        style={{ top: 20 }}
      >
        <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: 8 }}>
          {requirements.map((req, index) => (
            <div
              key={req.functionId}
              style={{
                marginBottom: index < requirements.length - 1 ? 24 : 0,
                paddingBottom: index < requirements.length - 1 ? 24 : 0,
                borderBottom: index < requirements.length - 1 ? '1px solid #f0f0f0' : 'none',
              }}
            >
              <Space style={{ marginBottom: 16 }}>
                <Tag color="processing">{req.functionId}</Tag>
                <Title level={5} style={{ margin: 0 }}>
                  {req.functionName}
                </Title>
              </Space>

              <Descriptions column={1} size="small" bordered>
                <Descriptions.Item label="功能描述">
                  <Paragraph style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                    {req.description}
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
                    {req.acceptanceCriteria}
                  </Paragraph>
                </Descriptions.Item>
                {req.notes && (
                  <Descriptions.Item label="需求说明">
                    <Paragraph style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                      {req.notes}
                    </Paragraph>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>
          ))}
        </div>
      </Modal>
    </>
  )
}
