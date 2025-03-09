<script setup lang="ts">
import { AppRoutes } from "@/router";
import { useAppInitStore } from "@/stores/appInit.ts";
import { ref } from "vue";

const { initApp } = useAppInitStore();
const isLoad = ref(false);
const clickInitApp = async () => {
  isLoad.value = true;
  await initApp();
  isLoad.value = false;
};
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <Button
        icon="pi pi-arrow-circle-left"
        @click="$router.push({ name: AppRoutes.MAIN })"
      />
      <Button
        class="ml-4"
        severity="secondary"
        icon="pi pi-refresh"
        :loading="isLoad"
        @click="clickInitApp"
      />
    </div>
    <div class="layout-topbar-actions">
      <!--      {{ user?.email }}-->
    </div>
  </div>
</template>
