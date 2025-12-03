package com.example.common.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * JSON工具类
 */
public class JsonUtils {
    
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    
    static {
        OBJECT_MAPPER.findAndRegisterModules();
        OBJECT_MAPPER.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
    }
    
    private JsonUtils() {
        // 工具类私有构造函数
    }
    
    /**
     * 对象转换为JSON字符串
     */
    public static String toJson(Object object) {
        if (object == null) {
            return null;
        }
        try {
            return OBJECT_MAPPER.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("JSON序列化失败", e);
        }
    }
    
    /**
     * JSON字符串转换为对象
     */
    public static <T> T fromJson(String json, Class<T> clazz) {
        if (StringUtils.isEmpty(json) || clazz == null) {
            return null;
        }
        try {
            return OBJECT_MAPPER.readValue(json, clazz);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("JSON反序列化失败", e);
        }
    }
    
    /**
     * 美化JSON字符串
     */
    public static String prettyPrint(Object object) {
        if (object == null) {
            return null;
        }
        try {
            return OBJECT_MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(object);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("JSON格式化失败", e);
        }
    }
    
    /**
     * 检查字符串是否为有效的JSON
     */
    public static boolean isValidJson(String json) {
        if (StringUtils.isEmpty(json)) {
            return false;
        }
        try {
            OBJECT_MAPPER.readTree(json);
            return true;
        } catch (JsonProcessingException e) {
            return false;
        }
    }
}