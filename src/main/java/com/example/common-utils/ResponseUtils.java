package com.example.common.utils;

import com.example.common.entities.ApiResponse;
import com.example.common.entities.PageResult;
import com.example.common.exception.BusinessException;

import java.util.List;

/**
 * 响应工具类
 */
public class ResponseUtils {
    
    private ResponseUtils() {
        // 工具类私有构造函数
    }
    
    /**
     * 成功响应（无数据）
     */
    public static <T> ApiResponse<T> success() {
        return ApiResponse.success();
    }
    
    /**
     * 成功响应（带数据）
     */
    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.success(data);
    }
    
    /**
     * 成功响应（带自定义消息）
     */
    public static <T> ApiResponse<T> success(String message, T data) {
        return ApiResponse.success(message, data);
    }
    
    /**
     * 错误响应
     */
    public static <T> ApiResponse<T> error() {
        return ApiResponse.error();
    }
    
    /**
     * 错误响应（带消息）
     */
    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.error(message);
    }
    
    /**
     * 错误响应（带错误码和消息）
     */
    public static <T> ApiResponse<T> error(String code, String message) {
        return ApiResponse.error(code, message);
    }
    
    /**
     * 业务异常响应
     */
    public static <T> ApiResponse<T> businessError(String message) {
        throw new BusinessException("BUSINESS_ERROR", message);
    }
    
    /**
     * 创建分页响应
     */
    public static <T> ApiResponse<PageResult<T>> pageResult(List<T> content, int page, int size, long totalElements) {
        PageResult<T> pageResult = PageResult.of(content, page, size, totalElements);
        return ApiResponse.success(pageResult);
    }
    
    /**
     * 创建空分页响应
     */
    public static <T> ApiResponse<PageResult<T>> emptyPageResult() {
        PageResult<T> pageResult = PageResult.empty();
        return ApiResponse.success(pageResult);
    }
}