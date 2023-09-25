import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useTasksStore } from '@/stores/tasks'
import { TaskStatus } from '@/enums/TaskStatus'
import type { Task } from '@/types/Task'

describe('Tasks store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active, so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('adds a task', () => {
    const tasks = useTasksStore()
    expect(tasks.tasks).toStrictEqual([])

    const task: Task = {
      id: 0,
      name: 'Simple task',
      description: 'A simple description about the task.',
      dueDate: new Date(),
      status: TaskStatus.Todo
    }

    tasks.addTask(task)
    expect(tasks.tasks).toStrictEqual([task])
  })

  it('delete a task', () => {
    const tasks = useTasksStore()
    expect(tasks.tasks).toStrictEqual([])

    const task: Task = {
      id: 0,
      name: 'Simple task',
      description: 'A simple description about the task.',
      dueDate: new Date(),
      status: TaskStatus.Todo
    }

    tasks.addTask(task)
    expect(tasks.tasks).toStrictEqual([task])

    tasks.removeTask(task.id)
    expect(tasks.tasks).toStrictEqual([])
  })

  it('update a task', () => {
    const tasks = useTasksStore()
    expect(tasks.tasks).toStrictEqual([])

    const task: Task = {
      id: 0,
      name: 'Simple task',
      description: 'A simple description about the task.',
      dueDate: new Date(),
      status: TaskStatus.Todo
    }

    tasks.addTask(task)
    expect(tasks.tasks).toStrictEqual([task])

    task.name = 'More complex task'
    tasks.updateTask(task)

    expect(tasks.tasks).toStrictEqual([task])
  })
})
