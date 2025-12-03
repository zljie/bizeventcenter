package com.example.common.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 非空校验注解
 */
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = NotEmptyValidator.class)
public @interface NotEmpty {
    
    String message() default "不能为空";
    
    Class<?>[] groups() default {};
    
    Class<? extends Payload>[] payload() default {};
    
    /**
     * 是否允许空字符串
     */
    boolean allowEmptyString() default false;
    
    /**
     * 是否允许空白字符
     */
    boolean allowBlank() default false;
}