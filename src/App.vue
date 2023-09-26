<script setup lang="ts">
import {useTasksStore} from "@/stores/tasks";
import {computed, onBeforeMount} from "vue";
import {TaskStatus} from "@/enums/TaskStatus";
import type { Task } from "@/types/Task";
import TaskGroup from "@/components/TaskGroup.vue";

const tasks = useTasksStore();

const dividedTasks = computed(() => {
  let dividedTasks: Array<Array<Task>> = [];

  Object.values(TaskStatus).forEach((key: string): void => {
    dividedTasks.push(tasks.tasks.filter((task: Task) => task.status === key));
  });

  return dividedTasks;
});

onBeforeMount(() => {
  tasks.addTask({
    id: tasks.latestTaskId + 1,
    name: 'Simple task',
    description: 'A simple description about the task.',
    dueDate: new Date(),
    status: TaskStatus.Todo,
  });
  tasks.addTask({
    id: tasks.latestTaskId + 1,
    name: 'Simple task2',
    description: 'A simple description about the task.',
    dueDate: new Date(),
    status: TaskStatus.InProgress,
  });
  tasks.addTask({
    id: tasks.latestTaskId + 1,
    name: 'Simple task3',
    description: 'A simple description about the task.',
    dueDate: new Date(),
    status: TaskStatus.Done,
  });
})
</script>

<template>
  <div class="task-groups">
    <TaskGroup
        v-for="(tasks, index) in dividedTasks"
        :key="index"
        :tasks="tasks"
    />
  </div>
</template>

<style lang="scss" scoped>
.task-groups {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

</style>
