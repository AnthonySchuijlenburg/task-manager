<script setup lang="ts">
import type { PropType } from 'vue'
import type { Task } from '@/types/Task'
import { ref } from 'vue'
import { TaskStatus } from '@/enums/TaskStatus'

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: false
  }
})

const emptyTask: Task = {
  id: -1,
  name: '',
  description: '',
  dueDate: new Date(),
  status: TaskStatus.Todo
}

const editableTask = ref<Task>(props.task ?? emptyTask)

const statusKeys: Array<string> = Object.keys(TaskStatus)
const statusValues: Array<string> = Object.values(TaskStatus)
</script>

<template>
  <form class="task-form" @submit.prevent="$emit('save', editableTask)">
    <label class="task-form__label" for="name">Task name *</label>
    <input
      id="name"
      v-model="editableTask.name"
      placeholder="Name"
      type="text"
      required
      class="task-form__input"
    />

    <label class="task-form__label" for="description">Task description *</label>
    <textarea
      id="description"
      v-model="editableTask.description"
      placeholder="Description"
      required
      class="task-form__input"
    />

    <label class="task-form__label" for="dueDate">Due date *</label>
    <input
      id="dueDate"
      v-model="editableTask.dueDate"
      type="date"
      required
      class="task-form__input"
    />

    <label class="task-form__label" for="dueDate">Due date *</label>
    <select id="dueDate" v-model="editableTask.status" required class="task-form__input">
      <option v-for="(_, index) in statusKeys" :key="index" :value="statusValues[index]">
        {{ statusValues[index] }}
      </option>
    </select>

    <button class="btn btn--primary" type="submit">Save task</button>
  </form>
</template>

<style scoped lang="scss">
.task-form {
  display: flex;
  flex-direction: column;
}

.task-form__input {
  margin-bottom: 1rem;
}
</style>
