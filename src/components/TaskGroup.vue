<script setup lang="ts">
import type { Task } from '@/types/Task'
import AbstractCard from '@/components/AbstractCard.vue'
import TaskCard from '@/components/TaskCard.vue'

defineProps({
  tasks: {
    required: true,
    type: Array<Task>
  }
})
</script>

<template>
  <div class="task-group">
    <AbstractCard>
      <h2 class="task-group__title">{{ tasks[0].status }}</h2>
      <TaskCard v-for="task in tasks" :task="task" :key="task.id" />
    </AbstractCard>
  </div>
</template>

<style scoped lang="scss">
.task-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.task-group__title {
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  padding: 0.5rem;
  margin-bottom: 1rem;
}
</style>
