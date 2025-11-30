// 需求相关类型定义

export interface UserStory {
  role: string
  description: string
  demands: string[]
  value: string
}

export interface FunctionRequirement {
  functionId: string
  functionName: string
  description: string
  acceptanceCriteria: string
  notes: string
}

export interface ModuleRequirement {
  moduleId: string
  moduleName: string
  moduleNameEn: string
  functions: FunctionRequirement[]
  relatedUserStories?: string[]
}

export interface RequirementsData {
  projectName: string
  projectGoal: string
  deployUrl: string
  userStories: UserStory[]
  modules: ModuleRequirement[]
}
