<script setup lang="ts">
import { initializeAuth } from "w-list-api";
// import PWABadge from "@/components/PWABadge.vue";

initializeAuth();
</script>

<template>
  <Suspense>
    <router-view />
  </Suspense>
  <Toast />
  <!--  <PWABadge />-->
</template>

<style scoped></style>
