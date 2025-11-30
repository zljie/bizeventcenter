# 企业中间件业务事件中心 - POC解决方案报告

## 1. 解决方案设计概要

### 1.1 问题背景
企业在数字化转型过程中，面临多系统间的业务事件管理问题：
- **事件孤岛**：各业务系统的业务事件缺乏统一管理平台
- **标准缺失**：缺乏标准化的业务事件定义和注册机制
- **订阅复杂**：业务事件的订阅和分发机制不统一
- **运维分散**：事件发布、订阅、监控缺乏统一管理中心

### 1.2 解决方案核心目标
构建一个**统一的企业中间件业务事件中心**，提供：
- **标准化事件注册**：基于SAP ERP石油化工类模版的事件定义体系
- **统一事件发布大厅**：提供可视化的业务事件发布和管理界面
- **智能订阅中心**：支持多种订阅模式和推送方式的事件订阅管理
- **简化管理界面**：提供直观易用的Web管理界面

### 1.3 核心价值
- **降低复杂度**：统一的事件管理平台，减少重复建设
- **提升标准化**：基于行业模版的事件标准化定义
- **增强可视化**：直观的管理界面，提升操作效率
- **便于扩展**：模块化设计支持业务快速扩展

## 2. 用户故事

### 2.1 石油化工业务系统架构师用户故事
**作为石油化工业务系统架构师，我希望能够**：
- 基于行业标准化的石油化工事件模版快速定义业务事件
- 在统一平台上管理所有业务系统的业务事件定义
- 通过可视化界面配置事件的分类、属性和触发条件
- 为新业务系统提供标准的事件注册接口和文档

**用户价值**：快速构建标准化的业务事件架构，降低系统集成复杂度

### 2.2 业务系统开发者用户故事
**作为业务系统开发者，我希望能够**：
- 通过Web界面查看已定义的事件模版和事件属性
- 基于模版快速创建符合标准的业务事件定义
- 通过API接口发布业务事件，无需关心底层分发机制
- 查看事件的发布状态和消费情况

**用户价值**：简化开发流程，专注于业务逻辑实现

### 2.3 事件订阅管理用户故事
**作为事件订阅管理用户，我希望能够**：
- 通过可视化界面查看所有可订阅的业务事件
- 配置事件订阅关系，支持多种过滤条件
- 设置多种推送方式（Webhook、消息队列、邮件等）
- 监控订阅状态和处理结果

**用户价值**：灵活配置事件订阅，快速响应业务变化

### 2.4 业务运营人员用户故事
**作为业务运营人员，我希望能够**：
- 查看业务事件的实时发布和处理统计
- 监控关键业务事件的处理状态和异常情况
- 查看业务事件日志，支持按时间、事件类型等条件查询
- 生成业务事件相关的运营报表

**用户价值**：提升业务洞察，支持运营决策和问题排查

### 2.5 企业CTO用户故事
**作为企业CTO，我希望能够**：
- 获得标准化的企业级业务事件管理平台
- 基于石油化工行业标准的事件管理体系
- 降低系统建设和维护成本
- 提升企业整体的数字化能力

**用户价值**：构建企业数字化基础设施，支持长期发展

## 3. 功能拆解

### 3.1 业务事件注册模块

#### 前端功能拆解

| 功能编号 | 功能目的 | 功能描述 | 验收标准 |
|---------|---------|---------|---------|
| F001 | 事件模版选择界面 | 提供SAP ERP石油化工类事件模版选择界面，支持按分类浏览 | 用户可以快速找到所需模版，模版信息展示完整 |
| F002 | 事件属性配置界面 | 提供事件属性配置表单，包括事件ID、名称、业务域等 | 表单验证完整，支持必填项校验和格式验证 |
| F003 | 事件分类管理 | 提供按生产、采购、销售、库存、安全等分类的事件管理 | 分类导航清晰，支持分类筛选和搜索 |
| F004 | 事件数据结构定义 | 提供JSON Schema格式的事件数据结构编辑器 | 支持语法高亮、实时预览、格式校验 |
| F005 | 事件模版保存管理 | 提供事件模版的保存、编辑、删除、复制功能 | 操作响应及时，支持撤销/重做和数据恢复 |

#### 后端功能拆解

| 功能编号 | 功能目的 | 功能描述 | 验收标准 |
|---------|---------|---------|---------|
| F006 | 事件模版库API | 提供石油化工事件模版的查询和获取API接口 | 支持按分类查询，响应时间<200ms |
| F007 | 事件注册管理API | 提供事件定义的新增、更新、删除、查询API接口 | 支持事务操作，数据一致性保证 |
| F008 | 事件属性校验 | 提供事件属性、业务规则、数据格式的服务器端校验 | 校验规则完整，错误信息明确 |
| F009 | 事件分类服务 | 提供事件分类的层级管理和统计服务 | 支持分类树形结构，支持统计查询 |
| F010 | 数据存储管理 | 提供事件定义和模版数据的持久化存储服务 | 数据可靠性99.9%，支持备份恢复 |

### 3.2 业务事件发布大厅模块

#### 前端功能拆解

| 功能编号 | 功能目的 | 功能描述 | 验收标准 |
|---------|---------|---------|---------|
| F011 | 事件列表展示 | 提供事件列表的表格展示，支持排序、筛选、分页 | 支持多条件筛选，响应时间<500ms |
| F012 | 事件状态管理 | 提供事件状态的可视化管理（草稿、已发布、已停用） | 状态切换有确认对话框，支持批量操作 |
| F013 | 新增/编辑事件 | 提供事件定义的新增和编辑界面，支持模版选择 | 表单数据完整性校验，支持自动保存草稿 |
| F014 | 事件搜索功能 | 提供按事件名称、分类、状态的搜索功能 | 支持模糊搜索，搜索结果实时更新 |
| F015 | 批量操作功能 | 提供批量发布、批量停用、批量删除操作 | 支持多选，操作有进度提示和结果反馈 |

#### 后端功能拆解

| 功能编号 | 功能目的 | 功能描述 | 验收标准 |
|---------|---------|---------|---------|
| F016 | 事件管理API | 提供事件定义CRUD的完整API服务 | RESTful设计，支持分页查询和条件过滤 |
| F017 | 事件发布服务 | 提供业务事件发布和状态管理服务 | 支持事件发布、停用、恢复等状态变更 |
| F018 | 事件搜索服务 | 提供高效的事件搜索和索引服务 | 支持全文搜索，索引更新及时 |
| F019 | 批量操作服务 | 提供批量事件操作的API服务 | 支持批量操作，操作原子性和幂等性 |
| F020 | 事件版本管理 | 提供事件定义的版本控制服务 | 支持版本历史查看，支持版本回滚 |

### 3.3 事件订阅中心模块

#### 前端功能拆解

| 功能编号 | 功能目的 | 功能描述 | 验收标准 |
|---------|---------|---------|---------|
| F021 | 订阅关系展示 | 提供订阅关系的列表展示和管理界面 | 订阅信息展示完整，支持订阅状态的实时更新 |
| F022 | 新增订阅配置 | 提供订阅关系的创建和配置界面 | 支持事件选择、过滤条件设置、推送方式配置 |
| F023 | 订阅规则设置 | 提供订阅过滤条件和触发规则的可视化配置 | 支持复杂条件配置，条件测试功能 |
| F024 | 订阅状态监控 | 提供订阅状态和处理结果的监控界面 | 支持实时状态监控，异常情况有告警提示 |
| F025 | 消息推送配置 | 提供Webhook、消息队列、邮件等推送方式配置 | 支持多种推送方式，配置界面直观易用 |

#### 后端功能拆解

| 功能编号 | 功能目的 | 功能描述 | 验收标准 |
|---------|---------|---------|---------|
| F026 | 订阅管理API | 提供订阅关系的CRUD API服务 | 支持复杂查询条件，响应时间<300ms |
| F027 | 订阅规则引擎 | 提供订阅匹配和过滤的规则引擎服务 | 支持复杂规则匹配，性能满足高并发要求 |
| F028 | 推送方式适配 | 提供Webhook、消息队列、邮件等推送方式适配 | 支持多种推送协议，失败重试机制完善 |
| F029 | 订阅状态服务 | 提供订阅状态监控和状态变更服务 | 支持状态变更推送，状态数据实时更新 |
| F030 | 推送队列管理 | 提供消息推送队列的存储和调度服务 | 队列可靠性99.9%，支持优先级和延时推送 |

### 3.4 系统管理和监控模块

#### 前端功能拆解

| 功能编号 | 功能目的 | 功能描述 | 验收标准 |
|---------|---------|---------|---------|
| F031 | 系统仪表盘 | 提供系统整体运行状态的可视化仪表盘 | 关键指标实时更新，支持多维度数据展示 |
| F032 | 业务事件日志 | 提供事件发布和消费的完整日志查询界面 | 支持按时间、事件类型、状态等条件查询 |
| F033 | 用户权限管理 | 提供用户登录和权限管理界面 | 支持角色权限配置，权限控制精确到功能级 |
| F034 | 系统设置管理 | 提供系统参数和配置的Web管理界面 | 配置修改实时生效，支持配置备份和恢复 |

#### 后端功能拆解

| 功能编号 | 功能目的 | 功能描述 | 验收标准 |
|---------|---------|---------|---------|
| F035 | 认证授权服务 | 提供JWT Token认证和权限验证服务 | 支持SSO集成，权限验证<100ms |
| F036 | 业务监控服务 | 提供事件发布、消费、订阅等业务指标监控 | 支持实时指标采集，支持告警规则配置 |
| F037 | 日志记录服务 | 提供完整的业务操作和系统日志记录 | 支持结构化日志，支持日志查询和分析 |
| F038 | 配置管理服务 | 提供系统参数的动态配置和热更新服务 | 配置变更实时生效，支持配置版本管理 |
| F039 | 统计报表服务 | 提供业务事件的统计分析和报表生成服务 | 支持多维度统计，报表生成时间<5s |

## 4. 技术架构设计

### 4.1 总体架构

```
┌─────────────────────────────────────────────────────────────────┐
│                        接入层 (Access Layer)                    │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   Web管理界面    │   第三方系统API   │       内部微服务调用        │
│ (React+AntD)    │   (REST/GraphQL) │        (Internal)          │
└─────────────────┴─────────────────┴─────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      业务事件引擎 (Business Event Engine)       │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   消息接入适配器  │  │   事件处理器    │  │   订阅管理器    │  │
│  │ Message Adapter │  │ Event Processor │  │ Subscription Mgr│  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   标准化消息转换  │  │   消费策略引擎   │  │   分发调度器    │  │
│  │ Standardizer    │  │ Consumer Engine │  │ Dispatcher      │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      消息中间件适配层 (MQ Adapter Layer)        │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   RocketMQ     │   Kafka        │       RabbitMQ             │
│   适配器        │   适配器        │       适配器               │
└─────────────────┴─────────────────┴─────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      底层消息服务 (Message Infrastructure)      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   RocketMQ      │  │     Kafka       │  │   RabbitMQ      │  │
│  │   集群          │  │   集群          │  │   集群          │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 核心技术栈

#### 前端技术栈
- **Web框架**: React 18 + TypeScript
- **UI组件库**: Ant Design X5
- **路由管理**: React Router v6
- **状态管理**: React Query + Context API
- **构建工具**: Vite
- **HTTP客户端**: Axios

#### 后端技术栈
- **开发框架**: Spring Boot 3.0+
- **数据访问**: MyBatis Plus + PostgreSQL
- **缓存**: Redis
- **消息队列**: RocketMQ (可扩展支持Kafka、RabbitMQ)
- **API文档**: Swagger/OpenAPI 3.0
- **认证授权**: JWT + Spring Security
- **监控**: Micrometer + Prometheus

### 4.3 业务事件引擎架构

#### 4.3.1 适配器层设计
业务事件引擎采用**适配器层架构**，实现消息中间件与业务组件的完全解耦：

**核心组件**：
- **消息接入适配器** (Message Adapter)：接收外部事件，统一转换为标准格式
- **标准化消息转换器** (Message Standardizer)：定义统一的内部消息规范
- **消费策略引擎** (Consumer Engine)：支持多种消费模式配置
- **分发调度器** (Dispatcher)：智能的消息路由和分发

**适配器接口**：
```java
public interface MessageQueueAdapter {
    SendResult send(StandardMessage message, String topic, String tag);
    void subscribe(String topic, String tag, MessageListener listener);
    void acknowledge(String messageId, String consumerGroup);
    HealthStatus healthCheck();
}
```

**支持的中间件**：
- **RocketMQ适配器**：企业级分布式消息中间件
- **Kafka适配器**：大数据流处理平台
- **RabbitMQ适配器**：可靠性消息传递

#### 4.3.2 标准消息格式
统一的内部消息格式规范，确保不同外部系统的消息能够标准化处理：

```json
{
  "messageId": "消息唯一标识",
  "eventId": "业务事件ID", 
  "eventName": "业务事件名称",
  "category": "事件分类",
  "businessDomain": "业务域",
  "timestamp": "事件时间戳",
  "priority": "处理优先级",
  "payload": "事件载荷数据",
  "metadata": {
    "source": "来源系统",
    "version": "事件版本",
    "tags": ["标签列表"],
    "correlationId": "关联ID"
  },
  "headers": {
    "traceId": "追踪ID",
    "spanId": "链路ID", 
    "userId": "用户ID",
    "tenantId": "租户ID"
  }
}
```

#### 4.3.3 消费策略模式
支持多种消费策略，满足不同业务场景的需求：

1. **即时推送模式**：事件发生时立即推送给订阅者
2. **批处理模式**：按时间窗口或数量批量推送
3. **延迟队列模式**：支持定时和延时消息推送
4. **事务模式**：支持分布式事务的消息处理

**配置示例**：
```yaml
event-engine:
  consumer:
    immediate-push:
      enabled: true
      timeout: 5000
    batch-push:
      enabled: true
      batch-size: 100
      time-window: 5000
    delayed-push:
      enabled: true
      delays:
        LOW: 300000      # 5分钟
        MEDIUM: 60000    # 1分钟
        HIGH: 10000      # 10秒
```

#### 4.3.4 监控和运维
- **健康检查**：实时监控适配器状态
- **性能指标**：消息处理量、延迟、成功率等
- **故障转移**：自动切换到健康的备用适配器
- **配置热更新**：支持运行时修改配置参数

### 4.4 数据库设计

```sql
-- 事件模版表
CREATE TABLE event_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL COMMENT '模版名称',
    category VARCHAR(50) NOT NULL COMMENT '事件分类',
    industry VARCHAR(50) DEFAULT 'petrochemical' COMMENT '行业类型',
    description TEXT COMMENT '模版描述',
    event_schema JSONB COMMENT '事件结构定义',
    example_data JSONB COMMENT '示例数据',
    created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_category (category),
    INDEX idx_industry (industry)
);

-- 业务事件定义表
CREATE TABLE business_events (
    id SERIAL PRIMARY KEY,
    event_id VARCHAR(100) UNIQUE NOT NULL COMMENT '事件ID',
    event_name VARCHAR(200) NOT NULL COMMENT '事件名称',
    category VARCHAR(50) NOT NULL COMMENT '事件分类',
    business_domain VARCHAR(100) COMMENT '业务域',
    trigger_condition TEXT COMMENT '触发条件',
    event_schema JSONB COMMENT '事件数据结构',
    priority INTEGER DEFAULT 1 COMMENT '优先级',
    status VARCHAR(20) DEFAULT 'DRAFT' COMMENT '状态',
    template_id INTEGER REFERENCES event_templates(id),
    created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100) COMMENT '创建人',
    INDEX idx_event_id (event_id),
    INDEX idx_category (category),
    INDEX idx_status (status)
);

-- 订阅关系表
CREATE TABLE event_subscriptions (
    id SERIAL PRIMARY KEY,
    subscription_name VARCHAR(200) NOT NULL COMMENT '订阅名称',
    event_ids JSONB COMMENT '订阅的事件ID列表',
    subscriber_info JSONB COMMENT '订阅者信息',
    filter_conditions JSONB COMMENT '过滤条件',
    delivery_config JSONB COMMENT '推送配置',
    status VARCHAR(20) DEFAULT 'ACTIVE' COMMENT '订阅状态',
    created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_events (event_ids)
);

-- 事件发布记录表
CREATE TABLE event_publish_logs (
    id SERIAL PRIMARY KEY,
    event_id VARCHAR(100) NOT NULL COMMENT '事件ID',
    publish_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payload JSONB COMMENT '事件载荷',
    status VARCHAR(20) DEFAULT 'SUCCESS' COMMENT '发布状态',
    error_message TEXT COMMENT '错误信息',
    retry_count INTEGER DEFAULT 0 COMMENT '重试次数',
    subscriber_count INTEGER DEFAULT 0 COMMENT '订阅者数量',
    delivery_count INTEGER DEFAULT 0 COMMENT '成功推送数量',
    INDEX idx_event_id (event_id),
    INDEX idx_publish_time (publish_time),
    INDEX idx_status (status)
);

-- 系统配置表
CREATE TABLE system_configs (
    id SERIAL PRIMARY KEY,
    config_key VARCHAR(100) UNIQUE NOT NULL COMMENT '配置键',
    config_value JSONB COMMENT '配置值',
    description TEXT COMMENT '配置描述',
    is_active BOOLEAN DEFAULT TRUE,
    created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_config_key (config_key)
);
```

### 4.5 核心服务设计

#### 4.4.1 事件管理服务
```java
@Service
public class EventManagementService {
    
    @Autowired
    private EventTemplateRepository templateRepository;
    
    @Autowired
    private BusinessEventRepository eventRepository;
    
    @Autowired
    private EventValidationService validationService;
    
    public Long createBusinessEvent(BusinessEventCreateRequest request) {
        // 1. 验证请求参数
        validationService.validateEventRequest(request);
        
        // 2. 检查事件ID唯一性
        if (eventRepository.existsByEventId(request.getEventId())) {
            throw new BusinessException("事件ID已存在");
        }
        
        // 3. 创建事件定义
        BusinessEvent event = BusinessEvent.builder()
            .eventId(request.getEventId())
            .eventName(request.getEventName())
            .category(request.getCategory())
            .businessDomain(request.getBusinessDomain())
            .triggerCondition(request.getTriggerCondition())
            .eventSchema(request.getEventSchema())
            .priority(request.getPriority())
            .status(EventStatus.DRAFT)
            .build();
        
        // 4. 保存到数据库
        BusinessEvent savedEvent = eventRepository.save(event);
        
        // 5. 触发后置处理
        postEventCreated(savedEvent);
        
        return savedEvent.getId();
    }
    
    public void publishEvent(String eventId, EventPublishRequest request) {
        // 1. 查找事件定义
        BusinessEvent event = eventRepository.findByEventId(eventId)
            .orElseThrow(() -> new BusinessException("事件不存在"));
            
        // 2. 发布事件
        EventPublishLog publishLog = EventPublishLog.builder()
            .eventId(eventId)
            .payload(request.getPayload())
            .status(EventPublishStatus.PROCESSING)
            .build();
            
        // 3. 保存发布记录
        EventPublishLog savedLog = publishLogRepository.save(publishLog);
        
        // 4. 触发事件分发
        eventDistributionService.distributeEvent(event, savedLog, request.getPayload());
    }
}
```

#### 4.4.2 事件订阅服务
```java
@Service
public class EventSubscriptionService {
    
    @Autowired
    private SubscriptionRepository subscriptionRepository;
    
    @Autowired
    private EventMatchingEngine matchingEngine;
    
    @Autowired
    private DeliveryService deliveryService;
    
    public Long createSubscription(SubscriptionCreateRequest request) {
        // 1. 验证订阅配置
        validateSubscriptionRequest(request);
        
        // 2. 创建订阅关系
        EventSubscription subscription = EventSubscription.builder()
            .subscriptionName(request.getSubscriptionName())
            .eventIds(request.getEventIds())
            .subscriberInfo(request.getSubscriberInfo())
            .filterConditions(request.getFilterConditions())
            .deliveryConfig(request.getDeliveryConfig())
            .status(SubscriptionStatus.ACTIVE)
            .build();
            
        // 3. 保存订阅关系
        EventSubscription savedSubscription = subscriptionRepository.save(subscription);
        
        // 4. 初始化订阅状态
        initializeSubscriptionStatus(savedSubscription);
        
        return savedSubscription.getId();
    }
    
    public void handleEventPublished(String eventId, EventPublishLog publishLog) {
        // 1. 查找相关订阅
        List<EventSubscription> subscriptions = findMatchingSubscriptions(eventId);
        
        // 2. 匹配订阅规则
        List<EventSubscription> matchedSubscriptions = matchingEngine
            .matchSubscriptions(subscriptions, publishLog.getPayload());
            
        // 3. 触发消息推送
        for (EventSubscription subscription : matchedSubscriptions) {
            deliveryService.queueDelivery(subscription, publishLog);
        }
    }
}
```

### 4.6 API接口设计

#### 4.5.1 事件模版API
```http
# 获取事件模版列表
GET /api/v1/event-templates?category=production&industry=petrochemical

# 获取单个模版详情
GET /api/v1/event-templates/{templateId}

# 按分类获取模版
GET /api/v1/event-templates/category/{category}
```

#### 4.5.2 业务事件管理API
```http
# 获取事件列表
GET /api/v1/events?category=production&status=PUBLISHED&page=1&size=20

# 创建事件
POST /api/v1/events
{
    "eventId": "refinery_production_start",
    "eventName": "炼油生产开始",
    "category": "production",
    "businessDomain": "refinery",
    "triggerCondition": "炼油装置启动",
    "eventSchema": {
        "properties": {
            "unitId": {"type": "string"},
            "startTime": {"type": "string", "format": "date-time"},
            "productionRate": {"type": "number"}
        }
    },
    "priority": 1
}

# 发布事件
POST /api/v1/events/{eventId}/publish
{
    "payload": {
        "unitId": "UNIT_001",
        "startTime": "2025-01-01T08:00:00Z",
        "productionRate": 1000
    }
}
```

#### 4.5.3 事件订阅管理API
```http
# 获取订阅列表
GET /api/v1/subscriptions?status=ACTIVE&page=1&size=20

# 创建订阅
POST /api/v1/subscriptions
{
    "subscriptionName": "炼油生产监控",
    "eventIds": ["refinery_production_start", "refinery_production_stop"],
    "filterConditions": {
        "unitIds": ["UNIT_001", "UNIT_002"],
        "priority": ["1", "2"]
    },
    "deliveryConfig": {
        "type": "WEBHOOK",
        "endpoint": "http://monitoring-system/api/events",
        "retryPolicy": {
            "maxRetries": 3,
            "retryInterval": 5000
        }
    }
}
```

### 4.7 石油化工事件模版设计

#### 4.6.1 生产事件模版
```json
{
    "template_id": "production_refinery_001",
    "name": "炼油生产事件模版",
    "category": "production",
    "industry": "petrochemical",
    "description": "炼油装置生产相关事件的标准化模版",
    "event_schema": {
        "type": "object",
        "properties": {
            "unitId": {
                "type": "string",
                "description": "装置ID"
            },
            "operationType": {
                "type": "string",
                "enum": ["START", "STOP", "PAUSE", "RESUME"],
                "description": "操作类型"
            },
            "operationTime": {
                "type": "string",
                "format": "date-time",
                "description": "操作时间"
            },
            "productionRate": {
                "type": "number",
                "description": "生产速率(吨/小时)"
            },
            "temperature": {
                "type": "number",
                "description": "温度(摄氏度)"
            },
            "pressure": {
                "type": "number",
                "description": "压力(MPa)"
            }
        },
        "required": ["unitId", "operationType", "operationTime"]
    },
    "example_data": {
        "unitId": "UNIT_001",
        "operationType": "START",
        "operationTime": "2025-01-01T08:00:00Z",
        "productionRate": 1000,
        "temperature": 350,
        "pressure": 2.5
    }
}
```

#### 4.6.2 安全事件模版
```json
{
    "template_id": "safety_monitoring_001",
    "name": "安全监控事件模版",
    "category": "safety",
    "industry": "petrochemical",
    "description": "石油化工安全监控相关事件的标准化模版",
    "event_schema": {
        "type": "object",
        "properties": {
            "monitorPointId": {
                "type": "string",
                "description": "监控点ID"
            },
            "alertType": {
                "type": "string",
                "enum": ["LEAK", "FIRE", "EXPLOSION", "GAS_DETECTED", "PRESSURE_ABNORMAL"],
                "description": "告警类型"
            },
            "alertLevel": {
                "type": "string",
                "enum": ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
                "description": "告警级别"
            },
            "alertTime": {
                "type": "string",
                "format": "date-time",
                "description": "告警时间"
            },
            "measuredValue": {
                "type": "number",
                "description": "实测值"
            },
            "thresholdValue": {
                "type": "number",
                "description": "阈值"
            },
            "location": {
                "type": "object",
                "properties": {
                    "plant": {"type": "string"},
                    "area": {"type": "string"},
                    "coordinates": {"type": "array", "items": {"type": "number"}}
                }
            }
        },
        "required": ["monitorPointId", "alertType", "alertLevel", "alertTime"]
    },
    "example_data": {
        "monitorPointId": "MP_001",
        "alertType": "GAS_DETECTED",
        "alertLevel": "HIGH",
        "alertTime": "2025-01-01T14:30:00Z",
        "measuredValue": 50.2,
        "thresholdValue": 30.0,
        "location": {
            "plant": "炼油厂A",
            "area": "催化裂化装置",
            "coordinates": [116.3974, 39.9093]
        }
    }
}
```

### 4.8 事件分发架构

```java
@Component
public class EventDistributionEngine {
    
    @Autowired
    private EventSubscriptionService subscriptionService;
    
    @Autowired
    private MessageQueueAdapter messageQueueAdapter;
    
    @Autowired
    private WebhookDeliveryService webhookDeliveryService;
    
    @Autowired
    private EmailDeliveryService emailDeliveryService;
    
    @Async("eventDistributionExecutor")
    public void distributeEvent(BusinessEvent event, EventPublishLog publishLog) {
        // 1. 查找相关订阅
        List<EventSubscription> subscriptions = subscriptionService
            .findActiveSubscriptions(event.getEventId());
            
        // 2. 并发分发到不同订阅者
        CompletableFuture.allOf(
            subscriptions.stream()
                .map(subscription -> CompletableFuture.runAsync(() -> {
                    try {
                        deliverToSubscription(event, publishLog, subscription);
                    } catch (Exception e) {
                        handleDeliveryFailure(subscription, publishLog, e);
                    }
                }, eventDistributionExecutor))
                .toArray(CompletableFuture[]::new)
        ).join();
        
        // 3. 更新分发状态
        updateDistributionStatus(publishLog, subscriptions.size());
    }
    
    private void deliverToSubscription(BusinessEvent event, EventPublishLog publishLog, 
                                      EventSubscription subscription) {
        DeliveryConfig deliveryConfig = subscription.getDeliveryConfig();
        
        switch (deliveryConfig.getType()) {
            case "ROCKETMQ":
                deliverViaRocketMQ(event, publishLog, subscription);
                break;
            case "WEBHOOK":
                deliverViaWebhook(event, publishLog, subscription);
                break;
            case "EMAIL":
                deliverViaEmail(event, publishLog, subscription);
                break;
            default:
                throw new UnsupportedOperationException("不支持的推送方式: " + deliveryConfig.getType());
        }
    }
}
```

---

## 5. POC项目交付成果

### 5.1 前端演示项目
- **在线访问地址**: https://0ma6ya0vwben.space.minimaxi.com
- **技术栈**: React 18 + TypeScript + Ant Design X5 + Vite
- **部署方式**: 静态网站部署，支持响应式访问

### 5.2 核心功能模块
1. **仪表板模块** - 系统整体运行状态展示
2. **消息主题登记模块** - SAP ERP石油化工事件模版管理
3. **事件发布中心模块** - 业务事件发布大厅（包含批量操作）
4. **事件订阅中心模块** - 订阅关系和推送配置管理
5. **业务事件日志模块** - 事件处理记录查询
6. **系统设置模块** - 系统参数配置管理

### 5.3 石油化工事件模版库
- **生产事件模版**: 炼油生产、化工反应、装置运行、设备维护
- **采购事件模版**: 原料采购、设备采购、服务采购
- **销售事件模版**: 产品销售、客户订单、合同管理
- **库存事件模版**: 入库出库、库存盘点、库存预警
- **安全事件模版**: 安全监控、事故报告、环保监测

### 5.4 数据持久化说明
⚠️ **当前版本**: POC前端展示项目，使用前端模拟数据  
⚠️ **数据操作**: 所有新增/编辑/删除操作仅在前端生效  
⚠️ **重置机制**: 页面刷新后重置为初始模版数据  
✅ **适用场景**: 功能演示、UI/UX评审、用户体验测试

### 5.5 生产环境升级路径
1. **后端API集成**: 集成Spring Boot后端服务
2. **数据库连接**: 连接PostgreSQL数据库
3. **认证授权**: 集成企业SSO和权限管理
4. **消息中间件**: 集成RocketMQ实现事件分发
5. **监控告警**: 集成Prometheus和Grafana监控
6. **容器化部署**: 基于Docker和Kubernetes的生产部署

## 总结

这个POC解决方案专注于企业中间件业务事件中心的核心功能展示，包含了：

1. **完整的用户故事体系** - 涵盖5类核心用户的业务需求
2. **详细的功能拆解方案** - 39个核心功能点，前端后端清晰分离
3. **实用的技术架构设计** - 基于现代技术栈的可扩展架构
4. **行业化的模版设计** - 针对石油化工行业的专业事件模版
5. **可操作的技术实现** - 包含完整的代码示例和接口设计

该方案可以作为企业中间件业务事件中心MVP版本的核心开发指导文档，同时POC演示项目已提供了完整的功能展示和用户体验验证。
