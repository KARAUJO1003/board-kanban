'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DragSourceMonitor, useDrag } from 'react-dnd'
import { ItemTypes } from './types/types'
import { ITask } from '@/data/dataTasks'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { useState } from 'react'
import { ComboBoxResponsiveStatus } from '../combobox-statuses/combobox-statuses'
import { useStatuses } from '@/hooks/use-statuses'

export const KanbanCard = ({
  task,
  onUpdateTask,
}: {
  task: ITask
  onUpdateTask: (updatedTask: ITask) => void
}) => {
  const [editMode, setEditMode] = useState<{
    title: boolean
    description: boolean
  }>({
    title: false,
    description: false,
  })
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const { statuses, createStatus } = useStatuses()

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOX,
    item: { id: task.id, statusId: task.statusId },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const handleTitleDoubleClick = () => {
    setEditMode({ ...editMode, title: true })
  }

  const handleDescriptionDoubleClick = () => {
    setEditMode({ ...editMode, description: true })
  }

  const handleTitleBlur = () => {
    setEditMode({ ...editMode, title: false })
    onUpdateTask({ ...task, title })
  }

  const handleDescriptionBlur = () => {
    setEditMode({ ...editMode, description: false })
    onUpdateTask({ ...task, description })
  }

  const handleTitleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTitleBlur()
    }
  }

  const handleDescriptionKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      handleDescriptionBlur()
    }
  }

  const getStatusName = (statusId: number) => {
    const status = statuses.find((status) => status.id === statusId)
    return status ? status.name : 'Unknown'
  }

  return (
    <Card
      ref={drag as any}
      className={`w-full dark:bg-zinc-950/80 backdrop-blur-sm shadow-lg ${
        isDragging
          ? 'opacity-90 ring-4  ring-zinc-200 dark:ring-zinc-900 cursor-grabbing'
          : 'cursor-grab'
      }`}
    >
      <CardHeader className="pb-3">
        {editMode.title ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyPress={handleTitleKeyPress}
            className="h-auto p-0 select-none outline-none ring-0 focus-visible:ring-0 border-none bg-transparent text-sm font-bold"
            autoFocus
          />
        ) : (
          <input
            onClick={handleTitleDoubleClick}
            value={title}
            readOnly
            className={`h-auto p-0 select-none outline-none ring-0 focus-visible:ring-0 border-none bg-transparent text-sm font-bold ${
              getStatusName(task.statusId) === 'done' &&
              'line-through text-muted-foreground'
            }`}
          />
        )}
        {editMode.description ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleDescriptionBlur}
            onKeyPress={handleDescriptionKeyPress}
            className="h-auto overflow-hidden flex flex-wrap p-0 outline-none ring-0 focus-visible:ring-0 border-none bg-transparent text-xs text-muted-foreground"
            autoFocus
          />
        ) : (
          <textarea
            onClick={handleDescriptionDoubleClick}
            value={description}
            readOnly
            className="h-auto overflow-hidden flex flex-wrap p-0 outline-none ring-0 focus-visible:ring-0 border-none bg-transparent text-xs text-muted-foreground"
          />
        )}
        <TooltipProvider>
          <Tooltip delayDuration={5}>
            <TooltipTrigger asChild>
              <span className="text-xs text-muted-foreground">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </TooltipTrigger>
            <TooltipContent
              align="start"
              className="bg-muted text-xs text-foreground"
            >
              Data de criação: {new Date(task.createdAt).toLocaleDateString()}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="flex flex-col">
        <ComboBoxResponsiveStatus statusValue={task.statusId} />
      </CardContent>
    </Card>
  )
}
