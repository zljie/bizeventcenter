package com.example.common.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Collection;

/**
 * 非空校验器
 */
public class NotEmptyValidator implements ConstraintValidator<NotEmpty, Object> {
    
    private boolean allowEmptyString;
    private boolean allowBlank;
    
    @Override
    public void initialize(NotEmpty constraintAnnotation) {
        this.allowEmptyString = constraintAnnotation.allowEmptyString();
        this.allowBlank = constraintAnnotation.allowBlank();
    }
    
    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }
        
        if (value instanceof String) {
            String str = (String) value;
            if (allowEmptyString && str.length() == 0) {
                return true;
            }
            if (allowBlank) {
                return str.trim().length() > 0;
            }
            return str.length() > 0;
        }
        
        if (value instanceof Number) {
            return true; // 数字不为空
        }
        
        if (value instanceof Collection) {
            return !((Collection<?>) value).isEmpty();
        }
        
        return true; // 其他类型默认通过
    }
}