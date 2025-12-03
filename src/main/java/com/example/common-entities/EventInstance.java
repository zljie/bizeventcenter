package com.example.common.entities;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Objects;

/**
 * 事件实例实体类
 */
public class EventInstance {
    private Long id;
    private Long templateId;
    private String name;
    private String content;
    private Map<String, Object> data;
    private String status;
    private LocalDateTime publishTime;
    private LocalDateTime expireTime;
    private String publishUser;
    private Long subscriberCount;
    private Long viewCount;

    public EventInstance() {
    }

    public EventInstance(Long id, Long templateId, String name, String content, 
                        Map<String, Object> data, String status, 
                        LocalDateTime publishTime, LocalDateTime expireTime, 
                        String publishUser, Long subscriberCount, Long viewCount) {
        this.id = id;
        this.templateId = templateId;
        this.name = name;
        this.content = content;
        this.data = data;
        this.status = status;
        this.publishTime = publishTime;
        this.expireTime = expireTime;
        this.publishUser = publishUser;
        this.subscriberCount = subscriberCount;
        this.viewCount = viewCount;
    }

    // Getter和Setter方法
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Long templateId) {
        this.templateId = templateId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getPublishTime() {
        return publishTime;
    }

    public void setPublishTime(LocalDateTime publishTime) {
        this.publishTime = publishTime;
    }

    public LocalDateTime getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(LocalDateTime expireTime) {
        this.expireTime = expireTime;
    }

    public String getPublishUser() {
        return publishUser;
    }

    public void setPublishUser(String publishUser) {
        this.publishUser = publishUser;
    }

    public Long getSubscriberCount() {
        return subscriberCount;
    }

    public void setSubscriberCount(Long subscriberCount) {
        this.subscriberCount = subscriberCount;
    }

    public Long getViewCount() {
        return viewCount;
    }

    public void setViewCount(Long viewCount) {
        this.viewCount = viewCount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EventInstance that = (EventInstance) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "EventInstance{" +
                "id=" + id +
                ", templateId=" + templateId +
                ", name='" + name + '\'' +
                ", status='" + status + '\'' +
                ", publishTime=" + publishTime +
                '}';
    }
}