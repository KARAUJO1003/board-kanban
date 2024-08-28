'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import {
  colors,
  statuses as initialStatuses,
  IStatus,
  tasks as initialTasks,
  ITask,
} from '@/data/dataTasks'

// Interface para o contexto
interface StatusContextType {
  statuses: IStatus[]
  tasks: ITask[]
  createStatus: (newStatusName: string, selectedColorName: string) => void
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
  updateTask: (updatedTask: ITask) => void
  createTask: (statusId?: number) => void
  moveTask: (taskId: number, newStatusId: number) => void
}

// Criando o contexto
const StatusContext = createContext<StatusContextType | undefined>(undefined)

// Criando o Provedor
export const StatusProvider = ({ children }: { children: ReactNode }) => {
  const [statuses, setStatuses] = useState<IStatus[]>(initialStatuses)
  const [tasks, setTasks] = useState<ITask[]>(initialTasks)

  const createStatus = (newStatusName: string, selectedColorName: string) => {
    const selectedColor = colors.find(
      (color) => color.name === selectedColorName,
    )?.hex

    if (newStatusName && selectedColor) {
      const newStatusId = statuses.length
        ? Math.max(...statuses.map((status) => status.id)) + 1
        : 1
      const newStatus: IStatus = {
        id: newStatusId,
        name: newStatusName,
        color: selectedColor,
      }
      setStatuses((prevStatuses) => [...prevStatuses, newStatus])
    }
  }

  const createTask = (statusId: number = 1) => {
    const newTask: ITask = {
      id: Math.random(),
      title: 'Empty',
      description: 'Description empty',
      statusId,
      createdAt: new Date().toISOString(),
      completed: false,
    }
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const updateTask = (updatedTask: ITask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    )
  }

  const moveTask = (taskId: number, newStatusId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, statusId: newStatusId } : task,
      ),
    )
  }

  return (
    <StatusContext.Provider
      value={{
        statuses,
        tasks,
        createStatus,
        setTasks,
        createTask,
        updateTask,
        moveTask,
      }}
    >
      {children}
    </StatusContext.Provider>
  )
}

// Hook personalizado para usar o contexto
export const useStatuses = () => {
  const context = useContext(StatusContext)
  if (!context) {
    throw new Error('useStatuses must be used within a StatusProvider')
  }
  return context
}
