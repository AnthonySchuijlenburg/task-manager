import { TaskStatus } from '@/enums/TaskStatus'

export interface Task {
  id: number
  name: string
  description: string
  dueDate: Date
  status: TaskStatus
}
