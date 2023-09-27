<template>
  <div class="card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.card {
  min-width: 20rem;
  min-height: 15rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.5rem;
  outline: 1px solid rgba(0, 0, 0, 0.4);
  color: rgba(0, 0, 0, 0.8);
  padding: 1rem;
}
</style>
