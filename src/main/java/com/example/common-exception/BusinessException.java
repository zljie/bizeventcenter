package com.example.common.exception;

/**
 * 业务异常类
 */
public class BusinessException extends RuntimeException {
    
    private String errorCode;
    private Object[] args;
    
    public BusinessException() {
        super();
    }
    
    public BusinessException(String message) {
        super(message);
        this.errorCode = "BUSINESS_ERROR";
    }
    
    public BusinessException(String message, Throwable cause) {
        super(message, cause);
        this.errorCode = "BUSINESS_ERROR";
    }
    
    public BusinessException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
    
    public BusinessException(String errorCode, String message, Object... args) {
        super(message);
        this.errorCode = errorCode;
        this.args = args;
    }
    
    public String getErrorCode() {
        return errorCode;
    }
    
    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }
    
    public Object[] getArgs() {
        return args;
    }
    
    public void setArgs(Object[] args) {
        this.args = args;
    }
}