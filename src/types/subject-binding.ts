import { Subject, PublishedEvent } from './index'

// 主题选择器选项类型
export interface SubjectOption {
  value: string;     // subjectId
  label: string;     // 显示名称 (格式: "主题名称 (事件ID)")
  subject: Subject;  // 完整的主题对象
}

// 事件与主题的关联信息
export interface EventSubjectBinding {
  eventId: string;
  subjectId?: string;
  subjectName?: string;
  bindingDate?: string;
  bindingType: 'direct' | 'derived'; // 直接关联 vs 衍生关联
}

// 主题版本信息
export interface SubjectVersion {
  subjectId: string;
  version: string;
  publishDate: string;
  changes: string[];
}

// 主题查询过滤选项
export interface SubjectFilter {
  category?: string;
  businessDomain?: string;
  priority?: string;
  keyword?: string;
}

// 主题选择器的表单数据类型
export interface SubjectSelectionForm {
  eventId: string;
  name: string;
  category: string;
  description: string;
  status: '草稿' | '已发布' | '已停用';
  publisher: string;
  subjectId?: string;
  subjectName?: string;
}

// 主题详情显示结构
export interface SubjectDisplayInfo {
  id: string;
  name: string;
  eventId: string;
  category: string;
  subcategory: string;
  businessDomain: string;
  priority: string;
  description: string;
  version?: string;
  bindingStatus: 'unbound' | 'current' | 'outdated';
}

// 主题关联状态枚举
export enum BindingStatus {
  UNBOUND = 'unbound',
  CURRENT = 'current',
  OUTDATED = 'outdated'
}

// 主题变更历史记录
export interface SubjectChangeHistory {
  subjectId: string;
  changes: Array<{
    changeDate: string;
    changeType: 'created' | 'updated' | 'deprecated';
    changeDescription: string;
    changedBy: string;
  }>;
}

// 事件主题关联的统计信息
export interface SubjectBindingStats {
  totalEvents: number;
  boundEvents: number;
  unboundEvents: number;
  averageBindingsPerSubject: number;
  topBindingSubjects: Array<{
    subjectId: string;
    subjectName: string;
    bindingCount: number;
  }>;
}
