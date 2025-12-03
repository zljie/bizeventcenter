package com.example.common.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

/**
 * 邮箱校验器
 */
public class EmailValidator implements ConstraintValidator<Email, String> {
    
    // 邮箱正则表达式
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@" +
        "(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$"
    );
    
    private boolean allowEmpty;
    
    @Override
    public void initialize(Email constraintAnnotation) {
        this.allowEmpty = constraintAnnotation.allowEmpty();
    }
    
    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (email == null || email.trim().length() == 0) {
            return allowEmpty;
        }
        
        String trimmedEmail = email.trim();
        return EMAIL_PATTERN.matcher(trimmedEmail).matches();
    }
}