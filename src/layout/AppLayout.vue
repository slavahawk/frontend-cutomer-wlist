<script setup lang="ts">
import AppTopbar from "./AppTopbar.vue";

import { useCountryStore } from "@/stores/countryStore.ts";
import { useGrapeStore } from "@/stores/grapeStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";
import { useWineListStore } from "@/stores/wineListStore.ts";
import { useAuthStore } from "@/stores/authStore.ts";
import { ref } from "vue";

const { fetchCountries } = useCountryStore();
const { fetchGrapes } = useGrapeStore();
const { fetchRegions } = useRegionStore();
const { getActiveList } = useWineListStore();
const { getMe } = useAuthStore();

const isLoad = ref(true);
Promise.allSettled([
  getMe(),
  fetchRegions(),
  fetchGrapes(),
  fetchCountries(),
  getActiveList(),
]).finally(() => (isLoad.value = false));
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
