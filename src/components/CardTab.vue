<template>
  <div class="CardTab">
    <div class="CardTab__name text-xl">{{ name }}</div>
    <!--    <img :src="'asd'" alt="Wine Image" @error="handleImageError" />-->
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  img?: string;
}>();
</script>

<style scoped lang="scss">
.CardTab {
  cursor: pointer;
  background: var(--surface-ground);
  padding: 2rem;
  border-radius: var(--content-border-radius);

  &:last-child {
    margin-bottom: 0;
  }

  &__name {
    color: var(--primary-color);
    text-align: center;
  }
}
</style>
