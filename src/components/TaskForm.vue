<script setup lang="ts">
import type { PropType } from 'vue'
import type { Task } from '@/types/Task'
import { TaskStatus } from '@/enums/TaskStatus'
import cloneDeep from 'lodash.clonedeep'

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

const editableTask: Task = cloneDeep(props.task) ?? emptyTask
function dateToYYYYMMDD(date: Date) {
  // alternative implementations in https://stackoverflow.com/q/23593052/1850609
  return (
    date &&
    new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0]
  )
}

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
      class="task-form__input"
      id="dueDate"
      type="date"
      :value="dateToYYYYMMDD(editableTask.dueDate)"
      @input="editableTask.dueDate = ($event?.target as HTMLInputElement).valueAsDate ?? new Date()"
    />

    <label class="task-form__label" for="dueDate">Due date *</label>
    <select id="dueDate" v-model="editableTask.status" required class="task-form__input">
      <option v-for="value in statusValues" :key="value" :value="value">
        {{ value }}
      </option>
    </select>

    <button class="btn btn--primary" type="submit">Save task</button>
    <button class="btn btn--primary" type="button" @click="$emit('cancel')">Cancel</button>
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
