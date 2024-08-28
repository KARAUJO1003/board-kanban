import { statuses } from '@/data/dataTasks'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStatusName = (statusId: number) => {
  const status = statuses.find((status) => status.id === statusId)
  return status ? status.name : 'Unknown'
}
