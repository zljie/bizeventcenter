package com.example.common.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

/**
 * 事件模板实体类
 */
public class EventTemplate {
    private Long id;
    private String name;
    private String description;
    private String category;
    private String content;
    private List<String> fields;
    private boolean active;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private String createUser;
    private String updateUser;

    public EventTemplate() {
    }

    public EventTemplate(Long id, String name, String description, String category, 
                        String content, List<String> fields, boolean active, 
                        LocalDateTime createTime, LocalDateTime updateTime, 
                        String createUser, String updateUser) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.content = content;
        this.fields = fields;
        this.active = active;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.createUser = createUser;
        this.updateUser = updateUser;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<String> getFields() {
        return fields;
    }

    public void setFields(List<String> fields) {
        this.fields = fields;
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

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public String getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EventTemplate that = (EventTemplate) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "EventTemplate{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                ", active=" + active +
                '}';
    }
}