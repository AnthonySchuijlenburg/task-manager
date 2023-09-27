<script setup lang="ts">
import NewTask from '@/components/NewTask.vue'
import TaskBoard from '@/components/TaskBoard.vue'
import { useTasksStore } from '@/stores/tasks'
import { onBeforeMount } from 'vue'
import { TaskStatus } from '@/enums/TaskStatus'

const tasks = useTasksStore()

onBeforeMount(() => {
  if (!tasks.tasks.length) {
    tasks.addTask({
      id: tasks.latestTaskId + 1,
      name: 'Wake up!',
      description:
        "This is the first and most critical task of the day. Don't get off on the wrong foot by snoozing multiple times, but just go for it!",
      dueDate: new Date(),
      status: TaskStatus.Done
    })
    tasks.addTask({
      id: tasks.latestTaskId + 1,
      name: 'Have a coffee',
      description: 'This is what gets you going for the day, a nice warm cup of coffee.',
      dueDate: new Date(),
      status: TaskStatus.InProgress
    })
    tasks.addTask({
      id: tasks.latestTaskId + 1,
      name: 'Go for a run',
      description:
        'Getting in your daily exercise is important, it keeps your body and mind healthy.',
      dueDate: new Date(),
      status: TaskStatus.Todo
    })
  }
})
</script>

<template>
  <div class="new-task">
    <NewTask />
  </div>
  <TaskBoard />
</template>

<style lang="scss" scoped>
.new-task {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}
</style>
