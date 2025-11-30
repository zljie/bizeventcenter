# 后端API接口（RESTful）

## 消息主题
- GET /api/topics
- GET /api/topics/:id
- POST /api/topics
- PUT /api/topics/:id
- DELETE /api/topics/:id

## 模板
- GET /api/templates?topic=...
- GET /api/templates/:id
- POST /api/templates
- PUT /api/templates/:id
- DELETE /api/templates/:id

## 消息登记
- GET /api/message-registrations?topic=...&eventId=...
- GET /api/message-registrations/:id
- POST /api/message-registrations
  - body: { topic, eventId, eventName, endpoint, pushMethod, description?, payloadSchema, templateId? }
- PUT /api/message-registrations/:id
- DELETE /api/message-registrations/:id

## 约定
- 返回采用JSON；出错返回 { error: code, message }
- 列表接口支持分页参数 `page`、`pageSize`

