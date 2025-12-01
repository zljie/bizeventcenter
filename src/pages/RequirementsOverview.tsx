import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import { ScrollArea } from '../components/ui/scroll-area'
import {
  FileText,
  Search,
  CheckCircle2,
  FolderOpen,
  ArrowRight,
  Lightbulb,
  Target,
} from 'lucide-react'
import type { RequirementsData, ModuleRequirement, FunctionRequirement } from '../types/requirements'
import { loadRequirements, functionToRouteMap } from '../utils/requirementsHelper'

export default function RequirementsOverview() {
  const [requirementsData, setRequirementsData] = useState<RequirementsData | null>(null)
  const [selectedModule, setSelectedModule] = useState<string>('')
  const [selectedFunction, setSelectedFunction] = useState<FunctionRequirement | null>(null)
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadRequirements()
      if (data) {
        setRequirementsData(data)
        if (data.modules.length > 0) {
          setSelectedModule(data.modules[0].moduleId)
        }
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="text-muted-foreground">加载需求数据中...</span>
        </div>
      </div>
    )
  }

  if (!requirementsData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-2">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground">需求数据加载失败</p>
        </div>
      </div>
    )
  }

  const currentModule = requirementsData.modules.find(
    (m) => m.moduleId === selectedModule
  )

  const filteredFunctions = currentModule?.functions.filter((f) =>
    searchText
      ? f.functionName.toLowerCase().includes(searchText.toLowerCase()) ||
        f.functionId.toLowerCase().includes(searchText.toLowerCase()) ||
        f.description.toLowerCase().includes(searchText.toLowerCase())
      : true
  )

  const handleModuleSelect = (moduleId: string) => {
    setSelectedModule(moduleId)
    setSelectedFunction(null)
    setSearchText('')
  }

  const handleFunctionClick = (func: FunctionRequirement) => {
    setSelectedFunction(func)
  }

  const handleNavigateToPage = (functionId: string) => {
    const route = functionToRouteMap[functionId]
    if (route) {
      navigate(route)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-gradient-to-r from-primary/10 to-primary/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">需求总纲</CardTitle>
              <p className="text-muted-foreground mt-1">{requirementsData.projectName}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 功能模块列表 */}
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-200px)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-primary" />
                功能模块
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100%-80px)]">
                <div className="space-y-1 p-4 pt-0">
                  {requirementsData.modules.map((module) => (
                    <button
                      key={module.moduleId}
                      onClick={() => handleModuleSelect(module.moduleId)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedModule === module.moduleId
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="font-medium">{module.moduleName}</div>
                      <div className={`text-sm ${
                        selectedModule === module.moduleId
                          ? 'text-primary-foreground/80'
                          : 'text-muted-foreground'
                      }`}>
                        {module.functions.length} 个功能点
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* 功能列表 */}
        <div className="lg:col-span-4">
          <Card className="h-[calc(100vh-200px)]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  功能列表
                </CardTitle>
                <div className="w-64">
                  <Input
                    placeholder="搜索功能..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="h-8"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ScrollArea className="h-[calc(100%-60px)]">
                {filteredFunctions && filteredFunctions.length > 0 ? (
                  <div className="space-y-3">
                    {filteredFunctions.map((func) => (
                      <Card
                        key={func.functionId}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedFunction?.functionId === func.functionId
                            ? 'ring-2 ring-primary border-primary'
                            : 'hover:border-primary/50'
                        }`}
                        onClick={() => handleFunctionClick(func)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <Badge variant="outline" className="shrink-0 text-xs">
                                {func.functionId}
                              </Badge>
                              <h4 className="font-medium text-sm leading-tight">
                                {func.functionName}
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {func.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32">
                    <div className="text-center space-y-2">
                      <Search className="h-8 w-8 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">暂无功能数据</p>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* 需求详情 */}
        <div className="lg:col-span-5">
          <Card className="h-[calc(100vh-200px)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                需求详情
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ScrollArea className="h-[calc(100%-60px)]">
                {selectedFunction ? (
                  <div className="space-y-6">
                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                      <Badge variant="outline" className="text-sm">
                        {selectedFunction.functionId}
                      </Badge>
                      <h3 className="font-semibold text-lg leading-tight">
                        {selectedFunction.functionName}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <FolderOpen className="h-4 w-4 text-muted-foreground" />
                          <h4 className="font-medium text-sm text-muted-foreground">
                            所属模块
                          </h4>
                        </div>
                        <p className="text-sm">{currentModule?.moduleName}</p>
                      </div>

                      <div className="p-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <h4 className="font-medium text-sm text-blue-800 dark:text-blue-200">
                            功能描述
                          </h4>
                        </div>
                        <p className="text-sm leading-relaxed text-blue-700 dark:text-blue-300">
                          {selectedFunction.description}
                        </p>
                      </div>

                      <div className="p-4 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <h4 className="font-medium text-sm text-green-800 dark:text-green-200">
                            验收标准
                          </h4>
                        </div>
                        <p className="text-sm leading-relaxed text-green-700 dark:text-green-300">
                          {selectedFunction.acceptanceCriteria}
                        </p>
                      </div>

                      {selectedFunction.notes && (
                        <div className="p-4 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                            <h4 className="font-medium text-sm text-amber-800 dark:text-amber-200">
                              需求说明
                            </h4>
                          </div>
                          <p className="text-sm leading-relaxed text-amber-700 dark:text-amber-300">
                            {selectedFunction.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {functionToRouteMap[selectedFunction.functionId] && (
                      <div className="pt-4">
                        <Separator />
                        <div className="flex justify-end pt-4">
                          <Button
                            onClick={() => handleNavigateToPage(selectedFunction.functionId)}
                            className="gap-2"
                          >
                            查看功能页面
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32">
                    <div className="text-center space-y-2">
                      <FileText className="h-8 w-8 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">
                        请从左侧选择功能查看详情
                      </p>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
