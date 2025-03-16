<script setup lang="ts">
import { initializeAuth } from "w-list-api";
import DialogAge from "@/components/DialogAge.vue";
// import PWABadge from "@/components/PWABadge.vue";

initializeAuth();
</script>

<template>
  <Suspense>
    <router-view />
  </Suspense>
  <Toast />
  <DialogAge />
  <!--  <PWABadge />-->
</template>

<style scoped></style>
