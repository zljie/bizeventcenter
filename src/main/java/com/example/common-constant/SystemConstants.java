package com.example.common.constant;

/**
 * 系统常量类
 */
public class SystemConstants {
    
    private SystemConstants() {
        // 工具类私有构造函数
    }
    
    // 响应状态码
    public static final String SUCCESS_CODE = "SUCCESS";
    public static final String ERROR_CODE = "ERROR";
    public static final String BUSINESS_ERROR_CODE = "BUSINESS_ERROR";
    public static final String VALIDATION_ERROR_CODE = "VALIDATION_ERROR";
    public static final String SYSTEM_ERROR_CODE = "SYSTEM_ERROR";
    
    // 事件状态
    public static final String EVENT_STATUS_DRAFT = "DRAFT";
    public static final String EVENT_STATUS_PUBLISHED = "PUBLISHED";
    public static final String EVENT_STATUS_EXPIRED = "EXPIRED";
    public static final String EVENT_STATUS_CANCELLED = "CANCELLED";
    
    // 通知方式
    public static final String NOTIFICATION_METHOD_EMAIL = "EMAIL";
    public static final String NOTIFICATION_METHOD_SMS = "SMS";
    public static final String NOTIFICATION_METHOD_WEBHOOK = "WEBHOOK";
    public static final String NOTIFICATION_METHOD_IN_APP = "IN_APP";
    
    // 操作类型
    public static final String OPERATION_CREATE = "CREATE";
    public static final String OPERATION_UPDATE = "UPDATE";
    public static final String OPERATION_DELETE = "DELETE";
    public static final String OPERATION_PUBLISH = "PUBLISH";
    public static final String OPERATION_SUBSCRIBE = "SUBSCRIBE";
    
    // 日志状态
    public static final String LOG_STATUS_SUCCESS = "SUCCESS";
    public static final String LOG_STATUS_FAILED = "FAILED";
    public static final String LOG_STATUS_PENDING = "PENDING";
    
    // 分页默认值
    public static final int DEFAULT_PAGE_SIZE = 20;
    public static final int MAX_PAGE_SIZE = 100;
    public static final int DEFAULT_PAGE = 0;
    
    // 字符串长度限制
    public static final int NAME_MAX_LENGTH = 100;
    public static final int DESCRIPTION_MAX_LENGTH = 500;
    public static final int CONTENT_MAX_LENGTH = 2000;
    public static final int URL_MAX_LENGTH = 500;
    public static final int EMAIL_MAX_LENGTH = 255;
    public static final int PHONE_MAX_LENGTH = 20;
    
    // 正则表达式
    public static final String EMAIL_REGEX = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
    public static final String PHONE_REGEX = "^1[3-9]\\d{9}$";
    
    // 时间格式
    public static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String DATE_FORMAT = "yyyy-MM-dd";
    public static final String TIME_FORMAT = "HH:mm:ss";
}