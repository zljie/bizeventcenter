package com.example.common.entities;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Objects;

/**
 * 事件日志实体类
 */
public class EventLog {
    private Long id;
    private Long eventInstanceId;
    private Long subscriptionId;
    private String operation;
    private String status;
    private String message;
    private Map<String, Object> metadata;
    private LocalDateTime operationTime;
    private String operator;
    private String requestId;
    private String responseData;
    private Long duration;

    public EventLog() {
    }

    public EventLog(Long id, Long eventInstanceId, Long subscriptionId, 
                   String operation, String status, String message, 
                   Map<String, Object> metadata, LocalDateTime operationTime, 
                   String operator, String requestId, String responseData, 
                   Long duration) {
        this.id = id;
        this.eventInstanceId = eventInstanceId;
        this.subscriptionId = subscriptionId;
        this.operation = operation;
        this.status = status;
        this.message = message;
        this.metadata = metadata;
        this.operationTime = operationTime;
        this.operator = operator;
        this.requestId = requestId;
        this.responseData = responseData;
        this.duration = duration;
    }

    // Getter和Setter方法
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEventInstanceId() {
        return eventInstanceId;
    }

    public void setEventInstanceId(Long eventInstanceId) {
        this.eventInstanceId = eventInstanceId;
    }

    public Long getSubscriptionId() {
        return subscriptionId;
    }

    public void setSubscriptionId(Long subscriptionId) {
        this.subscriptionId = subscriptionId;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, Object> getMetadata() {
        return metadata;
    }

    public void setMetadata(Map<String, Object> metadata) {
        this.metadata = metadata;
    }

    public LocalDateTime getOperationTime() {
        return operationTime;
    }

    public void setOperationTime(LocalDateTime operationTime) {
        this.operationTime = operationTime;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public String getResponseData() {
        return responseData;
    }

    public void setResponseData(String responseData) {
        this.responseData = responseData;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EventLog eventLog = (EventLog) o;
        return Objects.equals(id, eventLog.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "EventLog{" +
                "id=" + id +
                ", eventInstanceId=" + eventInstanceId +
                ", operation='" + operation + '\'' +
                ", status='" + status + '\'' +
                ", operationTime=" + operationTime +
                '}';
    }
}