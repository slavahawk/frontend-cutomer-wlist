<template>
  <div>
    <div
      v-if="isLoad"
      class="layout-wrapper relative flex justify-center items-center"
    >
      <ProgressSpinner />
    </div>
    <WinePage v-else />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAppInitStore } from "@/stores/appInit.ts";
import WinePage from "@/components/page/WinePage.vue";

const { isLoad } = storeToRefs(useAppInitStore());
</script>
