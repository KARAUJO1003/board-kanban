import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import { DragItem, ItemTypes } from '@/components/kanban-view/types/types'
import { KanbanCard } from '@/components/kanban-view/kanban-card'
import { IStatus, ITask } from '@/data/dataTasks'
import { cn } from '@/lib/utils'
import { useStatuses } from '@/hooks/use-statuses'

const icons = [
  {
    status: 'todo',
    icon: '🔴',
  },
  {
    status: 'pending',
    icon: '🟡',
  },
  {
    status: 'done',
    icon: '🟢',
  },
]

export const Column = ({
  status,
  tasks,
  onDropTask,
  onCreateTask,
  onUpdateTask,
}: {
  status: IStatus
  tasks: any
  onDropTask: (taskId: string, newStatus: string) => void
  onCreateTask: (status: string) => void
  onUpdateTask: (updatedTask: ITask) => void
}) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: (item: DragItem) => onDropTask(item.id, status.name),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const { statuses, createStatus } = useStatuses()

  const getStatusIcon = (status: string) => {
    const icon = icons.find((icon) => icon.status === status)?.icon
    return icon || '💭' // Ícone padrão se não encontrado
  }

  const getStatusColor = (statusId: number) => {
    const color = statuses.find((status) => status.id === statusId)?.color
    return color || 'sem cor' // Cor padrão se não encontrada
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div
      ref={drop as any}
      className={`flex flex-col w-full min-w-72 max-w-80 h-fit gap-3 border bg-zinc-100 dark:bg-zinc-900/60 p-2 rounded-xl  ${
        isOver ? 'dark:!bg-zinc-900 ring-4 ring-border/30' : ''
      }`}
    >
      <div className="flex items-center justify-between w-full gap-2">
        <div className="flex items-center gap-2">
          <span
            style={{ backgroundColor: getStatusColor(status.id) }}
            className={cn(['p-2 rounded-lg border-2'])}
          ></span>
          <h2 className="text-sm font-bold">{getStatusLabel(status.name)}</h2>
        </div>
        <Button
          size="icon"
          variant={'ghost'}
          onClick={() => onCreateTask(status.name)}
        >
          <Plus className="size-4" />
          <span className="sr-only">Add Task</span>
        </Button>
      </div>
      {tasks.map((task: any) => (
        <KanbanCard onUpdateTask={onUpdateTask} key={task.id} task={task} />
      ))}
      {isOver && (
        <div className="w-full h-36 bg-zinc-200/60 dark:bg-zinc-900/30 rounded-xl border-dashed border-2 border-zinc-400 dark:border-zinc-600/40" />
      )}
      <Button
        variant={'ghost'}
        className="justify-start w-full text-muted-foreground gap-2 text-sm"
        onClick={() => onCreateTask(status.name)}
      >
        <Plus className="size-4" />
        <span>Novo</span>
      </Button>
    </div>
  )
}
