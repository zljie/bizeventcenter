import { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'
import { FileText, CheckCircle2, Lightbulb } from 'lucide-react'
import type { FunctionRequirement } from '../types/requirements'

interface RequirementTooltipProps {
  functionIds: string[]
  requirements: FunctionRequirement[]
  buttonText?: string
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon'
}

export default function RequirementTooltip({
  functionIds,
  requirements,
  buttonText = '查看需求',
  buttonVariant = 'ghost',
  buttonSize = 'sm',
}: RequirementTooltipProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  if (requirements.length === 0) {
    return null
  }

  return (
    <Dialog open={isModalVisible} onOpenChange={setIsModalVisible}>
      <DialogTrigger asChild>
        <Button
          variant={buttonVariant}
          size={buttonSize}
          className="gap-2 text-primary border-primary/20 hover:bg-primary/10"
        >
          <FileText className="h-4 w-4" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <DialogTitle className="text-xl font-semibold">功能需求详情</DialogTitle>
            <Badge variant="secondary" className="ml-auto">
              {functionIds.length}个功能点
            </Badge>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            以下是相关功能的需求详细信息，包括功能描述、验收标准和相关说明
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {requirements.map((req, index) => (
              <Card key={req.functionId} className="border-l-4 border-l-primary">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1 shrink-0">
                      {req.functionId}
                    </Badge>
                    <h3 className="text-lg font-medium leading-tight">
                      {req.functionName}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">
                        功能描述
                      </h4>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {req.description}
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-950/50 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <h4 className="font-medium text-sm text-green-800 dark:text-green-200">
                          验收标准
                        </h4>
                      </div>
                      <p className="text-sm leading-relaxed text-green-700 dark:text-green-300 whitespace-pre-wrap">
                        {req.acceptanceCriteria}
                      </p>
                    </div>

                    {req.notes && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <h4 className="font-medium text-sm text-blue-800 dark:text-blue-200">
                            需求说明
                          </h4>
                        </div>
                        <p className="text-sm leading-relaxed text-blue-700 dark:text-blue-300 whitespace-pre-wrap">
                          {req.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {index < requirements.length - 1 && (
                    <Separator className="mt-6" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
