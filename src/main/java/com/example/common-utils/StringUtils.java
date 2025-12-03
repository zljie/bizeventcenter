package com.example.common.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

/**
 * 字符串工具类
 */
public class StringUtils {
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    private StringUtils() {
        // 工具类私有构造函数
    }
    
    /**
     * 判断字符串是否为空
     */
    public static boolean isEmpty(String str) {
        return str == null || str.trim().length() == 0;
    }
    
    /**
     * 判断字符串是否不为空
     */
    public static boolean isNotEmpty(String str) {
        return !isEmpty(str);
    }
    
    /**
     * 判断字符串是否为空白
     */
    public static boolean isBlank(String str) {
        return str == null || str.trim().length() == 0;
    }
    
    /**
     * 判断字符串是否不为空白
     */
    public static boolean isNotBlank(String str) {
        return !isBlank(str);
    }
    
    /**
     * 首字母大写
     */
    public static String capitalize(String str) {
        if (isEmpty(str)) {
            return str;
        }
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
    
    /**
     * 首字母小写
     */
    public static String uncapitalize(String str) {
        if (isEmpty(str)) {
            return str;
        }
        return str.substring(0, 1).toLowerCase() + str.substring(1);
    }
    
    /**
     * 生成UUID字符串
     */
    public static String generateUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }
    
    /**
     * 格式化时间
     */
    public static String formatDateTime(LocalDateTime dateTime) {
        if (dateTime == null) {
            return null;
        }
        return dateTime.format(DATE_FORMATTER);
    }
    
    /**
     * 去除字符串两端空格
     */
    public static String trim(String str) {
        return str != null ? str.trim() : null;
    }
}