<script setup lang="ts">
import { initializeAuth } from "w-list-api";
import TestAge from "@/components/testAge.vue";
// import PWABadge from "@/components/PWABadge.vue";

initializeAuth();
</script>

<template>
  <Suspense>
    <router-view />
  </Suspense>
  <Toast />
  <TestAge />
  <!--  <PWABadge />-->
</template>

<style scoped></style>
