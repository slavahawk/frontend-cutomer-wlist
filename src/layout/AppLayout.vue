<script setup lang="ts">
import AppTopbar from "./AppTopbar.vue";
import { storeToRefs } from "pinia";
import { useAppInitStore } from "@/stores/appInit.ts";

const { isLoad } = storeToRefs(useAppInitStore());
</script>

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
  <div v-else class="layout-wrapper">
    <app-topbar></app-topbar>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <Toast />
</template>
