package com.example.common.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

/**
 * 事件订阅实体类
 */
public class EventSubscription {
    private Long id;
    private String name;
    private String description;
    private List<String> eventTypes;
    private List<String> categories;
    private String notificationMethod;
    private String targetUrl;
    private String targetEmail;
    private String targetPhone;
    private boolean active;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private String subscriberUser;

    public EventSubscription() {
    }

    public EventSubscription(Long id, String name, String description, 
                           List<String> eventTypes, List<String> categories, 
                           String notificationMethod, String targetUrl, 
                           String targetEmail, String targetPhone, boolean active, 
                           LocalDateTime createTime, LocalDateTime updateTime, 
                           String subscriberUser) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.eventTypes = eventTypes;
        this.categories = categories;
        this.notificationMethod = notificationMethod;
        this.targetUrl = targetUrl;
        this.targetEmail = targetEmail;
        this.targetPhone = targetPhone;
        this.active = active;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.subscriberUser = subscriberUser;
    }

    // Getter和Setter方法
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getEventTypes() {
        return eventTypes;
    }

    public void setEventTypes(List<String> eventTypes) {
        this.eventTypes = eventTypes;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public String getNotificationMethod() {
        return notificationMethod;
    }

    public void setNotificationMethod(String notificationMethod) {
        this.notificationMethod = notificationMethod;
    }

    public String getTargetUrl() {
        return targetUrl;
    }

    public void setTargetUrl(String targetUrl) {
        this.targetUrl = targetUrl;
    }

    public String getTargetEmail() {
        return targetEmail;
    }

    public void setTargetEmail(String targetEmail) {
        this.targetEmail = targetEmail;
    }

    public String getTargetPhone() {
        return targetPhone;
    }

    public void setTargetPhone(String targetPhone) {
        this.targetPhone = targetPhone;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(LocalDateTime updateTime) {
        this.updateTime = updateTime;
    }

    public String getSubscriberUser() {
        return subscriberUser;
    }

    public void setSubscriberUser(String subscriberUser) {
        this.subscriberUser = subscriberUser;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EventSubscription that = (EventSubscription) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "EventSubscription{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", notificationMethod='" + notificationMethod + '\'' +
                ", active=" + active +
                '}';
    }
}