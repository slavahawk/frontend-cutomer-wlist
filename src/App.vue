<script setup lang="ts">
import { initializeAuth } from "@/api/api";
import PWABadge from "@/components/PWABadge.vue";

initializeAuth();
</script>

<template>
  <Suspense>
    <router-view />
  </Suspense>
  <Toast />
  <PWABadge />
</template>

<style scoped></style>
