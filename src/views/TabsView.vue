<template>
  <div
    v-if="isLoad"
    class="layout-wrapper relative flex justify-center items-center"
  >
    <ProgressSpinner
      class="spinner"
      strokeWidth="8"
      fill="transparent"
      animationDuration=".5s"
      aria-label="Custom ProgressSpinner"
    />
  </div>
  <WinePage v-else />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAppInitStore } from "@/stores/appInit.ts";
import WinePage from "@/components/page/WinePage.vue";

const { isLoad } = storeToRefs(useAppInitStore());
</script>
