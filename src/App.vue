<script setup lang="ts">
import { initializeAuth } from "@/api/api";
import PWABadge from "@/components/PWABadge.vue";

initializeAuth();
</script>

<template>
  <router-view />
  <Toast />
  <PWABadge />
</template>

<style scoped></style>
