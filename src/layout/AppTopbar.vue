<script setup lang="ts">
import { AppRoutes } from "@/router";
import { useAuthStore } from "@/stores/authStore.ts";
import { storeToRefs } from "pinia";

const { user, isLoad } = storeToRefs(useAuthStore());
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <Button
        icon="pi pi-arrow-circle-left"
        @click="$router.push({ name: AppRoutes.MAIN })"
      />
    </div>
    <div class="layout-topbar-actions">
      <span class="text-2xl">
        <ProgressSpinner
          v-if="isLoad"
          style="width: 50px; height: 50px"
          strokeWidth="8"
          fill="transparent"
          animationDuration=".5s"
          aria-label="Custom ProgressSpinner"
        />
        {{ user?.email }}</span
      >
    </div>
  </div>
</template>
