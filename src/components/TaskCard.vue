<script setup lang="ts">
import type { Task } from '@/types/Task'
import type { PropType } from 'vue'
import AbstractCard from '@/components/AbstractCard.vue'
import { computed } from 'vue'

const props = defineProps({
  task: {
    required: true,
    type: Object as PropType<Task>
  }
})

const dueDate = computed<string>(() => {
  return formatDate(new Date(props.task?.dueDate))
})

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}
</script>

<template>
  <AbstractCard>
    <div class="task">
      <h3 class="task__title">{{ task.name }}</h3>
      <p class="task__entry">
        <strong class="task__label">Description:</strong><span>{{ task.description }}</span>
      </p>
      <p class="task__entry">
        <strong class="task__label">Due date:</strong><span>{{ dueDate }}</span>
      </p>
    </div>
  </AbstractCard>
</template>

<style scoped lang="scss">
.task {
  display: flex;
  flex-direction: column;
}

.task > * {
  margin-bottom: 0.5rem;
}

.task__title {
  font-size: 1.5rem;
}

.task__entry {
  display: flex;
  flex-direction: column;
}
</style>
