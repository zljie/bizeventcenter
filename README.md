# 企业中间件业务事件中心（POC）

## 项目概述

企业中间件业务事件管理平台的前端展示项目（POC，概念验证）。用于演示企业在 SAP ERP 石油化工业务场景中的事件模板登记、事件发布、订阅管理与事件日志查看等核心能力。界面采用商务风格，强调信息密度、批量操作与数据可视化。

## 技术栈

- 前端框架：React 18 + TypeScript
- UI 组件：Ant Design 6.x
- 构建工具：Vite 6.x（支持 `BUILD_MODE=prod`）
- 路由管理：React Router v6
- 样式方案：Tailwind CSS + Ant Design 主题定制

## 运行要求

- Node.js ≥ 18（含 Corepack）
- pnpm ≥ 10（项目已声明 `packageManager: pnpm@10.19.0`）

如遇到 `esbuild` 安装脚本被忽略导致本地构建异常，可执行：

```bash
pnpm approve-builds
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm run dev
```

默认会在 `http://localhost:5173/` 启动；若端口占用将自动顺延（当前环境已分配为 `http://localhost:5178/`，以终端输出为准）。

### 生产构建与本地预览

```bash
pnpm run build           # 标准产物构建，输出到 dist/
pnpm run build:prod      # 生产模式构建（设置 BUILD_MODE=prod）
pnpm run preview         # 启动本地预览服务
```

## 目录结构

```
event-center-poc/
├─ src/                     # 源码
│  ├─ pages/                # 业务页面（Dashboard/Events/Subscriptions/Logs/Settings）
│  ├─ layouts/              # 布局（侧边栏、面包屑、头部）
│  ├─ components/           # 组件（ErrorBoundary 等）
│  ├─ hooks/                # Hooks（移动端适配等）
│  ├─ lib/                  # 工具方法
│  ├─ types/                # TypeScript 类型定义
│  ├─ main.tsx / App.tsx    # 入口与路由配置
│  └─ index.css / App.css   # 样式
├─ public/data/             # 前端模拟数据（JSON）
├─ dist/                    # 构建产物
├─ vite.config.ts           # Vite 配置（含别名与插件）
├─ tailwind.config.js       # Tailwind 配置
├─ eslint.config.js         # ESLint 配置
├─ tsconfig*.json           # TypeScript 配置
└─ package.json             # 项目元数据与脚本
```

## 路由与页面

- `/dashboard` 仪表板：关键指标与最近日志、活跃事件概览
- `/subjects` 消息主体登记：行业事件模板库，支持分类、搜索与详情
- `/events` 事件发布中心：事件的增删改查、批量发布/停用/删除
- `/subscriptions` 事件订阅：订阅配置与统计（正常/暂停/异常）
- `/logs` 业务事件日志：按状态/时间段/关键字筛选与详情查看
- `/settings` 系统设置：事件处理、日志与通知等全局配置

## 数据与持久化（POC说明）

- 数据来源：`public/data/` 目录下的 JSON 文件（模板、发布事件、订阅、日志）
- 前端操作（新增/编辑/删除）仅在内存中生效，刷新后恢复初始数据
- 该行为符合原型验证预期，适用于演示、评审与流程确认

### 走向生产的改造建议

1. 后端 API 接入：将 `fetch('/data/*.json')` 替换为真实接口
2. 状态管理升级：引入 Redux/Zustand 等，统一数据流与副作用处理
3. 认证与授权：企业 SSO / OAuth2.0
4. 数据持久化：引入数据库（如 PostgreSQL/MongoDB），保障一致性与审计
5. 实时能力：WebSocket 或 SSE 用于订阅推送与日志变更

## UI/UX 特性

- 可折叠侧边栏与简化面包屑，提升信息密度与导航效率
- 现代化表格体验：排序、筛选、分页、批量操作
- 统一商务配色（`#1890ff` 主色）与响应式布局

## 浏览器支持

- Chrome ≥ 90
- Firefox ≥ 88
- Safari ≥ 14
- Edge ≥ 90

## 版本信息

- 版本：v1.0.0
- 构建日期：2025-11-30
- 技术栈：React 18 + TypeScript + Ant Design 6 + Vite
