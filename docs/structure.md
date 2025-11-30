# 项目结构说明

- 菜单与路由：`src/layouts/MainLayout.tsx`、`src/App.tsx`
- 需求总纲入口：`/requirements`，页面在 `src/pages/RequirementsIndex.tsx`
- 需求内容来源：`public/event-center-poc-solution.md`
- Tooltip 组件：`src/components/RequirementTooltip.tsx`
- 需求解析与同步：`src/hooks/use-requirements.ts`
- 模块页面集成：
  - 仪表板：`src/pages/Dashboard.tsx`
  - 消息主题登记：`src/pages/SubjectsPage.tsx`
  - 事件发布中心：`src/pages/EventsPage.tsx`
  - 事件订阅中心：`src/pages/SubscriptionsPage.tsx`
  - 业务事件日志：`src/pages/LogsPage.tsx`
  - 系统设置：`src/pages/SettingsPage.tsx`
