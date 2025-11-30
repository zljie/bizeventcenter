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
}

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
}

export interface Subscription {
  id: string;
  eventId: string;
  eventName: string;
  subscriber: string;
  subscribeDate: string;
  status: '正常' | '暂停' | '异常';
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
