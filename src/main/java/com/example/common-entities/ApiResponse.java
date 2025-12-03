package com.example.common.entities;

import java.time.LocalDateTime;

/**
 * 统一API响应实体类
 */
public class ApiResponse<T> {
    private boolean success;
    private String code;
    private String message;
    private T data;
    private LocalDateTime timestamp;
    private String traceId;

    public ApiResponse() {
        this.timestamp = LocalDateTime.now();
    }

    public ApiResponse(boolean success, String code, String message, T data) {
        this.success = success;
        this.code = code;
        this.message = message;
        this.data = data;
        this.timestamp = LocalDateTime.now();
    }

    public static <T> ApiResponse<T> success() {
        return new ApiResponse<>(true, "SUCCESS", "操作成功", null);
    }

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, "SUCCESS", "操作成功", data);
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, "SUCCESS", message, data);
    }

    public static <T> ApiResponse<T> error() {
        return new ApiResponse<>(false, "ERROR", "操作失败", null);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, "ERROR", message, null);
    }

    public static <T> ApiResponse<T> error(String code, String message) {
        return new ApiResponse<>(false, code, message, null);
    }

    // Getter和Setter方法
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getTraceId() {
        return traceId;
    }

    public void setTraceId(String traceId) {
        this.traceId = traceId;
    }
}