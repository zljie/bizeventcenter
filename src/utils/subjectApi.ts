import { Subject, SubjectOption } from '../types/subject-binding'

// 模拟主题API - 在真实环境中这些应该是实际的HTTP请求
export class SubjectApiService {
  private static instance: SubjectApiService

  public static getInstance(): SubjectApiService {
    if (!SubjectApiService.instance) {
      SubjectApiService.instance = new SubjectApiService()
    }
    return SubjectApiService.instance
  }

  /**
   * 获取所有主题列表
   */
  async getAllSubjects(): Promise<Subject[]> {
    try {
      const response = await fetch('/data/event-templates.json')
      const data = await response.json()
      return data
    } catch (error) {
      console.error('获取主题列表失败:', error)
      throw new Error('获取主题列表失败')
    }
  }

  /**
   * 根据分类获取主题列表
   */
  async getSubjectsByCategory(category: string): Promise<Subject[]> {
    const allSubjects = await this.getAllSubjects()
    return allSubjects.filter(subject => subject.category === category)
  }

  /**
   * 根据关键词搜索主题
   */
  async searchSubjects(keyword: string): Promise<Subject[]> {
    if (!keyword.trim()) {
      return await this.getAllSubjects()
    }

    const allSubjects = await this.getAllSubjects()
    const lowerKeyword = keyword.toLowerCase()
    
    return allSubjects.filter(subject => 
      subject.name.toLowerCase().includes(lowerKeyword) ||
      subject.eventId.toLowerCase().includes(lowerKeyword) ||
      subject.description.toLowerCase().includes(lowerKeyword) ||
      subject.businessDomain.toLowerCase().includes(lowerKeyword)
    )
  }

  /**
   * 获取主题选择器选项
   */
  async getSubjectOptions(): Promise<SubjectOption[]> {
    const subjects = await this.getAllSubjects()
    
    return subjects.map(subject => ({
      value: subject.id,
      label: `${subject.name} (${subject.eventId})`,
      subject: subject
    }))
  }

  /**
   * 根据分类获取主题选择器选项
   */
  async getSubjectOptionsByCategory(category: string): Promise<SubjectOption[]> {
    const subjects = await this.getSubjectsByCategory(category)
    
    return subjects.map(subject => ({
      value: subject.id,
      label: `${subject.name} (${subject.eventId})`,
      subject: subject
    }))
  }

  /**
   * 根据关键词搜索主题选择器选项
   */
  async searchSubjectOptions(keyword: string): Promise<SubjectOption[]> {
    const subjects = await this.searchSubjects(keyword)
    
    return subjects.map(subject => ({
      value: subject.id,
      label: `${subject.name} (${subject.eventId})`,
      subject: subject
    }))
  }

  /**
   * 根据ID获取单个主题
   */
  async getSubjectById(id: string): Promise<Subject | null> {
    const allSubjects = await this.getAllSubjects()
    return allSubjects.find(subject => subject.id === id) || null
  }

  /**
   * 获取主题分类列表
   */
  async getSubjectCategories(): Promise<string[]> {
    const allSubjects = await this.getAllSubjects()
    const categories = [...new Set(allSubjects.map(subject => subject.category))]
    return categories.sort()
  }

  /**
   * 获取主题业务域列表
   */
  async getSubjectBusinessDomains(): Promise<string[]> {
    const allSubjects = await this.getAllSubjects()
    const domains = [...new Set(allSubjects.map(subject => subject.businessDomain))]
    return domains.sort()
  }

  /**
   * 获取主题优先级列表
   */
  async getSubjectPriorities(): Promise<string[]> {
    const allSubjects = await this.getAllSubjects()
    const priorities = [...new Set(allSubjects.map(subject => subject.priority))]
    return priorities.sort()
  }

  /**
   * 验证主题ID是否有效
   */
  async validateSubjectId(subjectId: string): Promise<boolean> {
    if (!subjectId) return true // 主题关联是可选的
    
    const subject = await this.getSubjectById(subjectId)
    return subject !== null
  }
}

// 导出单例实例
export const subjectApi = SubjectApiService.getInstance()

// 便捷的API方法
export const subjectApiMethods = {
  // 获取所有主题
  getAllSubjects: () => subjectApi.getAllSubjects(),
  
  // 获取主题选择器选项
  getSubjectOptions: () => subjectApi.getSubjectOptions(),
  
  // 搜索主题
  searchSubjects: (keyword: string) => subjectApi.searchSubjects(keyword),
  
  // 搜索主题选项
  searchSubjectOptions: (keyword: string) => subjectApi.searchSubjectOptions(keyword),
  
  // 获取单个主题
  getSubjectById: (id: string) => subjectApi.getSubjectById(id),
  
  // 获取分类列表
  getCategories: () => subjectApi.getSubjectCategories(),
  
  // 验证主题ID
  validateSubjectId: (id: string) => subjectApi.validateSubjectId(id)
}
