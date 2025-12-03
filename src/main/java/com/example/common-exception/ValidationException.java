package com.example.common.exception;

import java.util.List;
import java.util.ArrayList;

/**
 * 数据验证异常类
 */
public class ValidationException extends BusinessException {
    
    private List<FieldError> fieldErrors;
    
    public ValidationException() {
        super("VALIDATION_ERROR", "数据验证失败");
    }
    
    public ValidationException(String message) {
        super("VALIDATION_ERROR", message);
    }
    
    public ValidationException(String field, String message) {
        super("VALIDATION_ERROR", message);
        this.fieldErrors = new ArrayList<>();
        this.fieldErrors.add(new FieldError(field, message));
    }
    
    public ValidationException(List<FieldError> fieldErrors) {
        super("VALIDATION_ERROR", "数据验证失败");
        this.fieldErrors = fieldErrors;
    }
    
    public void addFieldError(String field, String message) {
        if (fieldErrors == null) {
            fieldErrors = new ArrayList<>();
        }
        fieldErrors.add(new FieldError(field, message));
    }
    
    public List<FieldError> getFieldErrors() {
        return fieldErrors;
    }
    
    public void setFieldErrors(List<FieldError> fieldErrors) {
        this.fieldErrors = fieldErrors;
    }
    
    /**
     * 字段错误内部类
     */
    public static class FieldError {
        private String field;
        private String message;
        
        public FieldError() {}
        
        public FieldError(String field, String message) {
            this.field = field;
            this.message = message;
        }
        
        public String getField() {
            return field;
        }
        
        public void setField(String field) {
            this.field = field;
        }
        
        public String getMessage() {
            return message;
        }
        
        public void setMessage(String message) {
            this.message = message;
        }
    }
}