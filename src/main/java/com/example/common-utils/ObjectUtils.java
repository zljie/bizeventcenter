package com.example.common.utils;

import java.util.Objects;

/**
 * 对象工具类
 */
public class ObjectUtils {
    
    private ObjectUtils() {
        // 工具类私有构造函数
    }
    
    /**
     * 判断对象是否为空
     */
    public static boolean isNull(Object obj) {
        return obj == null;
    }
    
    /**
     * 判断对象是否不为空
     */
    public static boolean isNotNull(Object obj) {
        return obj != null;
    }
    
    /**
     * 判断两个对象是否相等
     */
    public static boolean equals(Object obj1, Object obj2) {
        return Objects.equals(obj1, obj2);
    }
    
    /**
     * 如果对象为空返回默认值
     */
    public static <T> T defaultIfNull(T obj, T defaultValue) {
        return obj != null ? obj : defaultValue;
    }
    
    /**
     * 获取对象的字符串表示，如果对象为null则返回空字符串
     */
    public static String toStringOrEmpty(Object obj) {
        return obj != null ? obj.toString() : "";
    }
    
    /**
     * 比较两个对象的大小
     */
    @SuppressWarnings("unchecked")
    public static <T extends Comparable<T>> int compare(T obj1, T obj2) {
        if (obj1 == null && obj2 == null) {
            return 0;
        }
        if (obj1 == null) {
            return -1;
        }
        if (obj2 == null) {
            return 1;
        }
        return obj1.compareTo(obj2);
    }
    
    /**
     * 获取对象哈希码，如果对象为null返回0
     */
    public static int hashCodeOrZero(Object obj) {
        return obj != null ? obj.hashCode() : 0;
    }
}