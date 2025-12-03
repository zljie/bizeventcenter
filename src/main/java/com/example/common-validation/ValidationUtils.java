package com.example.common.validation;

import com.example.common.exception.ValidationException;
import com.example.common.utils.StringUtils;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

/**
 * 数据校验工具类
 */
public class ValidationUtils {
    
    private static final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    private static final Validator validator = factory.getValidator();
    
    private ValidationUtils() {
        // 工具类私有构造函数
    }
    
    /**
     * 校验对象
     */
    public static <T> void validate(T object) {
        if (object == null) {
            throw new ValidationException("对象不能为空");
        }
        
        Set<ConstraintViolation<T>> violations = validator.validate(object);
        
        if (!violations.isEmpty()) {
            ValidationException exception = new ValidationException();
            for (ConstraintViolation<T> violation : violations) {
                exception.addFieldError(violation.getPropertyPath().toString(), violation.getMessage());
            }
            throw exception;
        }
    }
    
    /**
     * 校验对象属性
     */
    public static <T> void validateProperty(T object, String propertyName) {
        if (object == null) {
            throw new ValidationException("对象不能为空");
        }
        
        if (StringUtils.isEmpty(propertyName)) {
            throw new ValidationException("属性名不能为空");
        }
        
        Set<ConstraintViolation<T>> violations = validator.validateProperty(object, propertyName);
        
        if (!violations.isEmpty()) {
            ValidationException exception = new ValidationException();
            for (ConstraintViolation<T> violation : violations) {
                exception.addFieldError(propertyName, violation.getMessage());
            }
            throw exception;
        }
    }
    
    /**
     * 校验类的单个属性
     */
    public static <T> void validateValue(Class<T> clazz, String propertyName, Object value) {
        if (clazz == null) {
            throw new ValidationException("类不能为空");
        }
        
        if (StringUtils.isEmpty(propertyName)) {
            throw new ValidationException("属性名不能为空");
        }
        
        Set<ConstraintViolation<T>> violations = validator.validateValue(clazz, propertyName, value);
        
        if (!violations.isEmpty()) {
            ValidationException exception = new ValidationException();
            for (ConstraintViolation<T> violation : violations) {
                exception.addFieldError(propertyName, violation.getMessage());
            }
            throw exception;
        }
    }
    
    /**
     * 快速校验字符串非空
     */
    public static void requireNonEmpty(String str, String fieldName) {
        if (StringUtils.isEmpty(str)) {
            throw new ValidationException(fieldName, "不能为空");
        }
    }
    
    /**
     * 快速校验字符串长度
     */
    public static void requireLength(String str, String fieldName, int minLength, int maxLength) {
        requireNonEmpty(str, fieldName);
        
        int length = str.length();
        if (length < minLength || length > maxLength) {
            throw new ValidationException(fieldName, 
                String.format("长度必须在%d到%d之间", minLength, maxLength));
        }
    }
}