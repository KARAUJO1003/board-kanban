import {
  cyan,
  emerald,
  gray,
  lime,
  orange,
  red,
  rose,
  violet,
  yellow,
  zinc,
} from 'tailwindcss/colors'

export interface ITask {
  id: number
  title: string
  completed: boolean
  statusId: number // Alterado para referenciar o id do status
  description: string
  createdAt: string
  completedAt?: string
}

export interface IStatus {
  id: number
  name: string
  color?: string
}
export const colors = [
  { name: 'Zinc', hex: zinc[500] },
  { name: 'Gray', hex: gray[500] },
  { name: 'Brown', hex: yellow[500] },
  { name: 'Orange', hex: red[500] },
  { name: 'Cyan', hex: cyan[500] },
  { name: 'Lime', hex: lime[500] },
  { name: 'Blue', hex: violet[500] },
  { name: 'Purple', hex: rose[500] },
  { name: 'Pink', hex: orange[500] },
  { name: 'Red', hex: emerald[500] },
]
export const statuses: IStatus[] = [
  { id: 1, name: 'todo', color: colors[8].hex },
  { id: 2, name: 'Revisão', color: colors[1].hex },
  { id: 3, name: 'pending', color: colors[2].hex },
  { id: 4, name: 'criação', color: colors[3].hex },
  { id: 5, name: 'done', color: colors[4].hex },
]

export const tasks: ITask[] = [
  {
    id: 1,
    title: 'Finalizar relatório',
    completed: false,
    statusId: 1, // Referencia o id do status
    description: 'Esta tarefa é muito importante para o projeto.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Revisar código',
    completed: true,
    statusId: 2, // Referencia o id do status
    description: 'Esta tarefa foi solicitada pelo cliente.',
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Enviar e-mail para cliente',
    completed: false,
    statusId: 3, // Referencia o id do status
    description: 'Esta tarefa é uma melhoria no sistema existente.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Testar funcionalidade',
    completed: false,
    statusId: 4, // Referencia o id do status
    description: 'Esta tarefa envolve a realização de testes unitários.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: 'Corrigir bug',
    completed: false,
    statusId: 5, // Referencia o id do status
    description: 'Esta tarefa requer a correção de um bug identificado.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    title: 'Implementar nova funcionalidade',
    completed: false,
    statusId: 5, // Referencia o id do status
    description:
      'Esta tarefa envolve a implementação de uma nova funcionalidade no sistema.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    title: 'Realizar reunião com a equipe',
    completed: false,
    statusId: 1, // Referencia o id do status
    description:
      'Esta tarefa requer a realização de uma reunião para discutir o andamento do projeto.',
    createdAt: new Date().toISOString(),
  },
]

export const filterTasksByStatus = (
  tasks: ITask[],
  statusId: number,
): ITask[] => {
  return tasks?.filter((task) => task.statusId === statusId)
}
