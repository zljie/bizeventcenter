export interface EventTemplate {
  id: string;
  category: string;
  subcategory: string;
  name: string;
  eventId: string;
  businessDomain: string;
  description: string;
  triggerCondition: string;
  dataStructure: Record<string, string>;
  priority: string;
  usageScenario: string;
  messageParameters?: Array<{
    id: string;
    name: string;
    type: string;
    required: string;
  }>;
}

// 主题类型定义（与EventTemplate相同，为语义清晰）
export type Subject = EventTemplate;

export interface PublishedEvent {
  id: string;
  eventId: string;
  name: string;
  category: string;
  description: string;
  status: '草稿' | '已发布' | '已停用';
  publishDate: string | null;
  publisher: string;
  subscribers: number;
  lastTrigger: string | null;
  // 主题关联字段
  subjectId?: string;      // 关联的主题ID
  subjectName?: string;    // 主题名称（冗余字段，提高显示性能）
}

export interface Subscription {
  id: string;
  eventId: string;
  eventName: string;
  subscriber: string;
  subscribeDate: string;
  status: '启动' | '暂停';
  pushMethod: string;
  endpoint: string;
  filterCondition: string;
  retryStrategy: string;
  successCount: number;
  failureCount: number;
}

export interface EventLog {
  id: string;
  eventId: string;
  eventName: string;
  triggerTime: string;
  status: '成功' | '失败';
  payload: Record<string, unknown>;
  subscribers: number;
  successPush: number;
  failedPush: number;
  processingTime: string;
  errorMessage?: string;
}
