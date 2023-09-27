import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/types/Task'

export const useTasksStore = defineStore(
  'tasks',
  () => {
    const tasks = ref<Array<Task>>([])
    // Start of at -1 so the first entry has an id of 0
    const latestTaskId = ref<number>(-1)

    function addTask(task: Task) {
      const index: number = tasks.value.findIndex(
        (taskToCheck): boolean => taskToCheck.id === task.id
      )
      if (index !== -1) {
        throw new Error('A task with this Id already exists')
      }

      tasks.value.push(task)
      latestTaskId.value++
    }

    function removeTask(id: number) {
      tasks.value = tasks.value.filter((task: Task): boolean => task.id !== id)
    }

    function updateTask(updatedTask: Task) {
      const taskIndex: number = tasks.value.findIndex(
        (task: Task): boolean => task.id === updatedTask.id
      )
      // let updatedTasks: Array<Task> = [...tasks.value];
      tasks.value[taskIndex] = updatedTask
    }

    return { tasks, latestTaskId, addTask, removeTask, updateTask }
  },
  {
    persist: true
  }
)
