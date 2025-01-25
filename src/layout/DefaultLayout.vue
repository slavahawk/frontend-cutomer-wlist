<template>
  <div class="DefaultLayout">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useAppInitStore } from "@/stores/appInit.ts";

const { initApp } = useAppInitStore();

initApp();
</script>

<style scoped lang="scss"></style>
