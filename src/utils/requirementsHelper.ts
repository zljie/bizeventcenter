import type { RequirementsData, FunctionRequirement, ModuleRequirement } from '../types/requirements'

let requirementsCache: RequirementsData | null = null

// 加载需求数据
export async function loadRequirements(): Promise<RequirementsData | null> {
  if (requirementsCache) {
    return requirementsCache
  }

  try {
    const response = await fetch('/requirements-data.json')
    const data = await response.json()
    requirementsCache = data
    return data
  } catch (error) {
    console.error('加载需求数据失败:', error)
    return null
  }
}

// 根据功能ID获取需求详情
export async function getRequirementByFunctionId(functionId: string): Promise<FunctionRequirement | null> {
  const data = await loadRequirements()
  if (!data) return null

  for (const module of data.modules) {
    const func = module.functions.find(f => f.functionId === functionId)
    if (func) {
      return func
    }
  }
  return null
}

// 根据功能ID数组获取多个需求详情
export async function getRequirementsByFunctionIds(functionIds: string[]): Promise<FunctionRequirement[]> {
  const data = await loadRequirements()
  if (!data) return []

  const results: FunctionRequirement[] = []
  for (const module of data.modules) {
    for (const func of module.functions) {
      if (functionIds.includes(func.functionId)) {
        results.push(func)
      }
    }
  }
  return results
}

// 根据模块名称获取模块需求
export async function getModuleRequirement(moduleName: string): Promise<ModuleRequirement | null> {
  const data = await loadRequirements()
  if (!data) return null

  return data.modules.find(m => m.moduleName === moduleName || m.moduleNameEn === moduleName) || null
}

// 获取所有模块
export async function getAllModules(): Promise<ModuleRequirement[]> {
  const data = await loadRequirements()
  return data?.modules || []
}

// 功能ID与页面路由的映射
export const functionToRouteMap: Record<string, string> = {
  'F031': '/dashboard',
  'F036': '/dashboard',
  'F037': '/dashboard',
  'F039': '/dashboard',
  'F001': '/subjects',
  'F002': '/subjects',
  'F003': '/subjects',
  'F004': '/subjects',
  'F005': '/subjects',
  'F011': '/events',
  'F012': '/events',
  'F013': '/events',
  'F014': '/events',
  'F015': '/events',
  'F021': '/subscriptions',
  'F022': '/subscriptions',
  'F023': '/subscriptions',
  'F024': '/subscriptions',
  'F025': '/subscriptions',
  'F032': '/logs',
  'F033': '/settings',
  'F034': '/settings',
}
