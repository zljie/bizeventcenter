# 版本更新说明

## v1.1.0 (2025-12-03)

### 新增
- 需求查看体系：新增“需求总纲”页面（`/requirements`），支持模块-功能-详情联动与页面跳转
- 组件化需求弹窗：新增 `RequirementModal`，在各模块页面展示结构化“功能描述/验收标准/说明”
- 事件与主题解耦：事件发布中心新增“消息主题”“主题版本”字段与列表列，支持版本化管理
- 消息登记流程：恢复并挂载 `MessageRegisterPage` 路由（`/message/register`），主题页按钮“消息登记”直达表单
- 主题数据：新增 `public/data/message-topics.json` 作为主题选择数据源，失败时回退从模板去重生成
- 文档与规范：新增 `docs/api.md`（RESTful 接口约定）、`db/migrations/001_create_tables.sql`（主题/模板/登记三表）

### 改进
- 术语统一：全局“消息主体登记”改为“消息主题登记”（菜单、面包屑、文档与测试）
- Vercel 部署：修复 `vercel.json`（`framework: "vite"` 与 SPA `rewrites`），支持 Git 自动构建与路由回退
- 开发稳定性：`package.json` 增加 `packageManager: pnpm@10.19.0`，避免 Corepack 写入权限问题

### 修复
- 路由缺失：恢复 `/message/register` 路由与页面，避免主题页“消息登记”跳转 404

### 兼容性与告警
- 现有 Ant Design 弃用警告（`Space.direction` / `Card.bordered` / `Statistic.valueStyle`）不影响功能；后续将统一替换为推荐属性

### 测试
- 端到端：`tests/e2e-message-registration.md` 验证“模版详情 → 消息登记 → 保存 → 返回主题页”流程
- 页面验证：`/events` 新增事件需绑定“消息主题”，列表展示主题与版本

### 迁移
- 如接入后端，建议事件模型扩展 `topicId/topicVersion` 并以 ID 绑定；数据库结构参考迁移脚本

