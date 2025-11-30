# 端到端流程测试：消息登记

## 场景
1. 在“消息主题登记”页面打开任一模板详情
2. 点击“模版创建事件”按钮
3. 跳转至“消息登记”页面，表单预填 `topic/eventId/eventName`
4. 完成其余字段并保存
5. 返回“消息主题登记”页面，验证数据已写入 localStorage `messageRegistrations`

## 断言
- 表单必填项校验触发提示
- 保存成功出现提示并跳转
- `messageRegistrations[0]` 字段完整且与输入一致

