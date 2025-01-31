<script setup lang="ts">
import { AppRoutes } from "@/router";
import { useAuthStore } from "@/stores/authStore.ts";
import { storeToRefs } from "pinia";
import { useAppInitStore } from "@/stores/appInit.ts";

const { user } = storeToRefs(useAuthStore());
const { initApp, isLoad } = useAppInitStore();
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
        @click="initApp"
      />
    </div>
    <div class="layout-topbar-actions">
      <!--      {{ user?.email }}-->
    </div>
  </div>
</template>
