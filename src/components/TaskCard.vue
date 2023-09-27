<script setup lang="ts">
import type { Task } from '@/types/Task'
import type { PropType } from 'vue'
import AbstractCard from '@/components/AbstractCard.vue'
import { computed, ref } from 'vue'
import { Pencil, Trash } from 'lucide-vue-next'
import TaskForm from '@/components/TaskForm.vue'
import { useTasksStore } from '@/stores/tasks'

const tasks = useTasksStore()

const props = defineProps({
  task: {
    required: true,
    type: Object as PropType<Task>
  }
})

const isEditing = ref<boolean>(false)

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

function save(updatedTask: Task) {
  tasks.updateTask(updatedTask)
  isEditing.value = false
}

function remove(task: Task) {
  tasks.removeTask(task.id)
}
</script>

<template>
  <AbstractCard>
    <TaskForm v-if="isEditing" :task="task" @save="save" @cancel="isEditing = false" />

    <div v-else class="task">
      <div class="task__header">
        <h3 class="task__title">{{ task.name }}</h3>
        <div>
          <Trash @click="remove(task)" />
          <Pencil @click="isEditing = true" />
        </div>
      </div>
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

.task__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .lucide {
    cursor: pointer;
    margin: 0 0.2rem;
  }
}

.task__title {
  font-size: 1.5rem;
}

.task__entry {
  display: flex;
  flex-direction: column;
}
</style>
