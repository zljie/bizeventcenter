# 事件中心平台通用模块

## 模块概述

本项目包含五个通用模块，为整个事件中心平台提供基础支持：

- **common-entities**: 业务实体类
- **common-utils**: 工具类
- **common-exception**: 异常处理
- **common-config**: 配置类
- **common-validation**: 数据校验
- **common-constant**: 常量定义

## 实体类 (common-entities)

### EventTemplate - 事件模板
```java
EventTemplate template = new EventTemplate();
template.setName("系统通知模板");
template.setCategory("SYSTEM");
template.setContent("这是一条系统通知");
```

### EventInstance - 事件实例
```java
EventInstance instance = new EventInstance();
instance.setTemplateId(templateId);
instance.setStatus("PUBLISHED");
Map<String, Object> data = new HashMap<>();
data.put("title", "重要通知");
instance.setData(data);
```

### EventSubscription - 事件订阅
```java
EventSubscription subscription = new EventSubscription();
subscription.setName("管理员订阅");
subscription.setNotificationMethod("EMAIL");
subscription.setTargetEmail("admin@example.com");
```

### EventLog - 事件日志
```java
EventLog log = new EventLog();
log.setEventInstanceId(eventId);
log.setOperation("PUBLISH");
log.setStatus("SUCCESS");
log.setMessage("事件发布成功");
```

### ApiResponse - 统一API响应
```java
// 成功响应
ApiResponse<String> success = ApiResponse.success("操作成功", data);

// 错误响应
ApiResponse<String> error = ApiResponse.error("操作失败");
```

### PageResult - 分页结果
```java
PageResult<User> pageResult = PageResult.of(users, 0, 20, totalCount);
```

## 工具类 (common-utils)

### StringUtils - 字符串工具
```java
// 检查字符串是否为空
if (StringUtils.isEmpty(str)) {
    // 处理空字符串
}

// 生成UUID
String uuid = StringUtils.generateUUID();

// 格式化时间
String formattedDate = StringUtils.formatDateTime(LocalDateTime.now());
```

### ObjectUtils - 对象工具
```java
// 获取默认值
String result = ObjectUtils.defaultIfNull(obj, "default");

// 比较对象
int compare = ObjectUtils.compare(obj1, obj2);

// 获取对象哈希码
int hash = ObjectUtils.hashCodeOrZero(obj);
```

### JsonUtils - JSON工具
```java
// 对象转JSON
String json = JsonUtils.toJson(user);

// JSON转对象
User user = JsonUtils.fromJson(json, User.class);

// 美化JSON
String prettyJson = JsonUtils.prettyPrint(user);
```

### ResponseUtils - 响应工具
```java
// 统一响应格式
return ResponseUtils.success(data);
return ResponseUtils.error("操作失败");
return ResponseUtils.pageResult(list, page, size, total);
```

## 异常处理 (common-exception)

### BusinessException - 业务异常
```java
// 抛出业务异常
throw new BusinessException("业务逻辑错误");

// 带错误码的异常
throw new BusinessException("BUSINESS_ERROR", "业务逻辑错误");
```

### ValidationException - 验证异常
```java
// 添加字段错误
ValidationException exception = new ValidationException();
exception.addFieldError("name", "用户名不能为空");
throw exception;
```

### GlobalExceptionHandler - 全局异常处理器
自动处理以下异常：
- BusinessException
- ValidationException
- MethodArgumentNotValidException
- BindException
- Exception
- NullPointerException

## 配置类 (common-config)

### JpaConfig - JPA配置
```java
@Configuration
@EnableJpaRepositories(basePackages = "com.example.**.repository")
@EnableTransactionManagement
public class JpaConfig {
    // 配置事务管理器
}
```

### WebConfig - Web配置
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    // 配置CORS
    // 配置静态资源
    // 配置拦截器
}
```

## 数据校验 (common-validation)

### 自定义校验注解

#### NotEmpty - 非空校验
```java
public class User {
    @NotEmpty(message = "用户名不能为空")
    private String username;
    
    @NotEmpty(allowEmptyString = false)
    private String email;
}
```

#### Email - 邮箱校验
```java
public class User {
    @Email(message = "邮箱格式不正确")
    private String email;
}
```

### ValidationUtils - 校验工具
```java
// 校验对象
ValidationUtils.validate(user);

// 校验属性
ValidationUtils.validateProperty(user, "username");

// 快速校验
ValidationUtils.requireNonEmpty(str, "用户名");
ValidationUtils.requireLength(str, "描述", 1, 500);
```

## 常量定义 (common-constant)

### SystemConstants - 系统常量
```java
// 响应状态码
SystemConstants.SUCCESS_CODE
SystemConstants.ERROR_CODE

// 事件状态
SystemConstants.EVENT_STATUS_DRAFT
SystemConstants.EVENT_STATUS_PUBLISHED

// 通知方式
SystemConstants.NOTIFICATION_METHOD_EMAIL
SystemConstants.NOTIFICATION_METHOD_SMS
```

## 使用示例

### 完整的API响应示例
```java
@RestController
@RequestMapping("/api/events")
public class EventController {
    
    @Autowired
    private EventService eventService;
    
    @GetMapping
    public ApiResponse<PageResult<EventTemplate>> getEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        try {
            List<EventTemplate> events = eventService.getEvents(page, size);
            long total = eventService.getTotalCount();
            
            return ResponseUtils.pageResult(events, page, size, total);
        } catch (Exception e) {
            return ResponseUtils.error("获取事件列表失败");
        }
    }
    
    @PostMapping
    public ApiResponse<EventTemplate> createEvent(@Valid @RequestBody EventTemplate template) {
        try {
            ValidationUtils.validate(template);
            
            EventTemplate created = eventService.createEvent(template);
            return ResponseUtils.success("创建成功", created);
        } catch (ValidationException e) {
            return ResponseUtils.error(e.getMessage());
        } catch (BusinessException e) {
            return ResponseUtils.error(e.getErrorCode(), e.getMessage());
        }
    }
}
```

## 依赖配置

确保在pom.xml中包含以下依赖：

```xml
<dependencies>
    <!-- Spring Boot Starters -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    
    <!-- JSON处理 -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
    </dependency>
    
    <!-- 日志 -->
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
    </dependency>
</dependencies>
```

## 注意事项

1. 所有实体类都实现了`equals()`和`hashCode()`方法
2. 工具类使用私有构造函数防止实例化
3. 异常处理器提供统一的错误响应格式
4. 校验注解可以组合使用
5. 分页查询建议使用`PageResult`统一处理

这些通用模块为整个项目提供了标准化和一致性的基础架构支持。