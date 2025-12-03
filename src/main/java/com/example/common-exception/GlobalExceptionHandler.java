package com.example.common.exception;

import com.example.common.entities.ApiResponse;
import com.example.common.utils.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

/**
 * 全局异常处理器
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    
    /**
     * 处理业务异常
     */
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiResponse<Void>> handleBusinessException(BusinessException e) {
        logger.error("业务异常: {}", e.getMessage(), e);
        ApiResponse<Void> response = ApiResponse.error(e.getErrorCode(), e.getMessage());
        return ResponseEntity.badRequest().body(response);
    }
    
    /**
     * 处理数据验证异常
     */
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationException(ValidationException e) {
        logger.warn("数据验证异常: {}", e.getMessage());
        ApiResponse<Void> response = ApiResponse.error(e.getErrorCode(), e.getMessage());
        response.getData(); // 这里可以添加字段错误详情
        return ResponseEntity.badRequest().body(response);
    }
    
    /**
     * 处理参数校验异常
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        logger.warn("参数校验异常: {}", e.getMessage());
        
        StringBuilder errorMsg = new StringBuilder("参数校验失败: ");
        for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
            errorMsg.append(fieldError.getField()).append(": ").append(fieldError.getDefaultMessage()).append("; ");
        }
        
        ApiResponse<Void> response = ApiResponse.error("VALIDATION_ERROR", errorMsg.toString());
        return ResponseEntity.badRequest().body(response);
    }
    
    /**
     * 处理参数绑定异常
     */
    @ExceptionHandler(BindException.class)
    public ResponseEntity<ApiResponse<Void>> handleBindException(BindException e) {
        logger.warn("参数绑定异常: {}", e.getMessage());
        
        StringBuilder errorMsg = new StringBuilder("参数绑定失败: ");
        for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
            errorMsg.append(fieldError.getField()).append(": ").append(fieldError.getDefaultMessage()).append("; ");
        }
        
        ApiResponse<Void> response = ApiResponse.error("BIND_ERROR", errorMsg.toString());
        return ResponseEntity.badRequest().body(response);
    }
    
    /**
     * 处理通用异常
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleException(Exception e) {
        logger.error("系统异常: {}", e.getMessage(), e);
        ApiResponse<Void> response = ApiResponse.error("SYSTEM_ERROR", "系统内部错误，请联系管理员");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
    
    /**
     * 处理空指针异常
     */
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ApiResponse<Void>> handleNullPointerException(NullPointerException e) {
        logger.error("空指针异常: {}", e.getMessage(), e);
        ApiResponse<Void> response = ApiResponse.error("NULL_POINTER_ERROR", "空指针异常，请检查参数");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}