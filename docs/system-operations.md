# 系统功能与操作说明

## 模块总览
- 消息主题登记：行业事件模板库的浏览、搜索、详情与登记入口
- 事件发布中心：事件列表管理、筛选、批量操作与新增/编辑表单
- 事件订阅中心：订阅关系列表、统计、新增/编辑订阅
- 消息登记：基于模板或主题进行消息登记的表单流程

---

## 消息主题登记
- 入口与页面：`/subjects`
- 列表与筛选
  - 搜索：按“事件名称/ID/描述”模糊搜索（`src/pages/SubjectsPage.tsx:221`）
  - 分类筛选：下拉选择业务分类（生产/采购/销售/库存/安全）（`src/pages/SubjectsPage.tsx:229`）
  - 标签统计：在分类 Tab 下方显示子分类标签与数量（`src/pages/SubjectsPage.tsx:178-185`）
- 列表字段（`src/pages/SubjectsPage.tsx:86-165`）
  - 事件ID、事件名称、业务分类（彩色标签）、子分类、业务域、优先级（彩色标签）、描述、操作
  - 操作列：查看详情（弹窗）
- 详情弹窗（`src/pages/SubjectsPage.tsx:287-325`）
  - 展示事件模板的属性、触发条件、使用场景、数据结构 JSON
  - 关联模板：展示与该主题关联的自定义模板ID（`src/pages/SubjectsPage.tsx:318-334`）
  - 操作按钮：
    - 消息登记：跳转 `消息登记` 表单并预填参数（`src/pages/SubjectsPage.tsx:302-312`）
    - 使用此模板：提示基于模板创建事件配置
- 新增入口绑定
  - 页面右上角按钮“消息登记”：跳转 `/message/register`（`src/pages/SubjectsPage.tsx:241-244`）
  - 菜单“消息登记”已隐藏，但仍支持深链 `/subjects?openRegister=1` 自动打开登记页（`src/pages/SubjectsPage.tsx:80-87`）

---

## 事件发布中心
- 入口与页面：`/events`
- 列表与筛选（`src/pages/EventsPage.tsx:349-363`）
  - 搜索：按“事件名称/ID/分类”模糊搜索（`src/pages/EventsPage.tsx:304-311`）
  - 状态筛选：全部/草稿/已发布/已停用（`src/pages/EventsPage.tsx:312-321`）
  - 批量操作：发布、停用、删除（`src/pages/EventsPage.tsx:328-346`；处理函数在 `handleBatchPublish/Disable/Delete`）
- 列表字段（`src/pages/EventsPage.tsx:182-286`）
  - 事件ID、事件名称、分类（彩色标签）、状态（彩色标签）、发布者、订阅数、发布时间、最后触发、操作
  - 消息主题：新增主题列与版本标签（`src/pages/EventsPage.tsx:205-214`）
- 新增与编辑
  - 打开方式：右上角“新增事件”（`src/pages/EventsPage.tsx:323-325`）或操作列“编辑”（`src/pages/EventsPage.tsx:265-272`）
  - 表单字段（`src/pages/EventsPage.tsx:374-427` 与新增主题字段在 `src/pages/EventsPage.tsx:398-414`）
    - 消息主题（必填，下拉：来自 `public/data/message-topics.json` 或模板去重）
    - 主题版本（选填）
    - 事件ID、事件名称、分类、描述、状态、发布者
  - 提交保存：`handleSubmit`（`src/pages/EventsPage.tsx:152-174`）
    - 新建：生成 `evt-时间戳`，插入列表顶端
    - 编辑：原位更新选中记录

---

## 事件订阅中心
- 入口与页面：`/subscriptions`
- 指标卡与统计（`src/pages/SubscriptionsPage.tsx:250-291`）
  - 正常/暂停订阅数量、总成功推送、总失败推送
- 列表与筛选（`src/pages/SubscriptionsPage.tsx:321-333`）
  - 搜索：按“事件名称/订阅者/事件ID”模糊搜索（`src/pages/SubscriptionsPage.tsx:297-304`）
  - 状态筛选：全部/正常/暂停/异常（`src/pages/SubscriptionsPage.tsx:305-315`）
- 列表字段（`src/pages/SubscriptionsPage.tsx:132-248`）
  - 订阅者（固定左列）、事件名称、事件ID、状态（状态徽标）、推送方式、端点地址、过滤条件、成功次数、失败次数、订阅时间、操作
- 新增与编辑
  - 打开方式：右上角“新增订阅”（`src/pages/SubscriptionsPage.tsx:316-319`）或操作列“编辑”（`src/pages/SubscriptionsPage.tsx:227-234`）
  - 表单字段（`src/pages/SubscriptionsPage.tsx:344-410`）
    - 订阅者名称、事件ID、事件名称、推送方式、端点地址、过滤条件、重试策略、状态
  - 提交保存：`handleSubmit`（`src/pages/SubscriptionsPage.tsx:93-118`）
    - 新建：生成 `sub-时间戳`，插入列表顶端
    - 编辑：原位更新选中记录

---

## 消息登记
- 入口与页面：`/message/register`
  - 支持通过主题页“消息登记”按钮打开并预填参数（`topic/eventId/eventName`）（`src/pages/MessageRegisterPage.tsx:13-25`）
- 表单字段（`src/pages/MessageRegisterPage.tsx:27-91`）
  - 消息主题（必填）、事件ID（必填）、事件名称（必填）、推送方式（Webhook/HTTP API/消息队列/邮件）、端点地址（必填）、描述、数据结构（JSON）
- 提交保存与跳转（`src/pages/MessageRegisterPage.tsx:33-61`）
  - 校验 JSON；写入 `localStorage.messageRegistrations`；成功后返回“消息主题登记”页

---

## 表单校验与数据源
- 表单校验：所有必填项在提交时校验；数据结构字段需为合法 JSON（各表单 `handleSubmit` 块）
- 数据源：
  - 主题登记：`public/data/event-templates.json` + `localStorage.customTemplates` 合并（`src/pages/SubjectsPage.tsx:43-49`）
  - 事件发布：`public/data/published-events.json`；主题下拉取自 `public/data/message-topics.json`（回退为模板列表去重）（`src/pages/EventsPage.tsx:46-61`、`src/pages/EventsPage.tsx:52-61`）
  - 订阅中心：`public/data/subscriptions.json`（`src/pages/SubscriptionsPage.tsx:46-50`）
  - 日志中心：`public/data/event-logs.json`

---

## 列表常用操作
- 事件发布中心：
  - 选择行 → 批量发布 / 批量停用 / 批量删除（顶部批量操作区）
  - 清空选择 → “取消选择”链接（`src/pages/EventsPage.tsx:339-344`）
- 订阅中心：
  - 编辑 / 删除（操作列，`Popconfirm` 二次确认）
- 主题登记：
  - 查看详情（弹窗）与“消息登记”跳转（右上角按钮）

---

## 版本管理与关联
- 事件与主题解耦：事件记录包含 `topic` 与 `topicVersion` 字段（`src/types/index.ts:15-26`）
- 主题与模板关联：在模板详情中展示与该主题关联的自定义模板ID集合（`src/pages/SubjectsPage.tsx:318-334`）
- 后续建议：后端以 `topicId` 建立强绑定，支持主题版本的兼容策略与审计字段（参考 `docs/api.md` 与 `db/migrations/001_create_tables.sql`）

---

## 快速操作流程示例
- 从主题登记到消息登记：主题页 → 查看详情 → “消息登记” → 填写并保存 → 返回主题页
- 从事件发布到订阅：事件页 → 新增事件（选择消息主题与版本） → 保存 → 订阅页 → 新增订阅（选择事件ID与端点）
- 从总纲到页面：`/requirements` → 选择模块与功能 → 右侧“查看功能页面”直达对应模块页面

---

## 常见问题
- 路由回退：生产环境由 `vercel.json` 配置的 `rewrites` 保证 SPA 路由回退到 `index.html`
- AntD 弃用警告：不影响功能，如需消除可替换为推荐属性（Space/Statistic/Card）

