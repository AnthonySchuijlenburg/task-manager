<script setup lang="ts">
import NewTask from '@/components/NewTask.vue'
import TaskBoard from '@/components/TaskBoard.vue'
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
