<script setup lang="ts">
import TaskGroup from '@/components/TaskGroup.vue'
import { useTasksStore } from '@/stores/tasks'
import { computed } from 'vue'
import { TaskStatus } from '@/enums/TaskStatus'
import type { Task } from '@/types/Task'

const tasks = useTasksStore()
const statuses: Array<string> = Object.values(TaskStatus)

const dividedTasks = computed(() => {
  let dividedTasks: { [key: string]: Array<Task> } = {}

  statuses.forEach((key: string): void => {
    dividedTasks[key] = tasks.tasks.filter((task: Task) => task.status === key)
  })

  return dividedTasks
})
</script>

<template>
  <div class="task-groups">
    <TaskGroup
      v-for="(status, index) in statuses"
      :key="index"
      :tasks="dividedTasks[status]"
      :status="status"
    />
  </div>
</template>

<style scoped lang="scss">
.task-groups {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
