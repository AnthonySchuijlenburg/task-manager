<script setup lang="ts">
import type { Task } from '@/types/Task'
import { ref } from 'vue'
import AbstractCard from '@/components/AbstractCard.vue'
import TaskForm from '@/components/TaskForm.vue'
import { useTasksStore } from '@/stores/tasks'

const tasks = useTasksStore()

const isEditing = ref<boolean>(false)

function newTask() {
  isEditing.value = true
}

function saveTask(task: Task) {
  task.id = tasks.latestTaskId + 1
  tasks.addTask(task)
  isEditing.value = false
}
</script>

<template>
  <div class="new-task-card">
    <AbstractCard v-if="isEditing">
      <TaskForm @save="saveTask" @cancel="isEditing = false" />
    </AbstractCard>
    <button v-else class="btn btn--primary" @click="newTask">New task</button>
  </div>
</template>

<style lang="scss" scoped>
.new-task-card {
  max-width: 24rem;
  display: flex;
  flex-grow: 1;
  justify-content: center;
}
</style>
