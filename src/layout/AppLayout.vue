<script setup lang="ts">
import AppTopbar from "./AppTopbar.vue";

import { useCountryStore } from "@/stores/countryStore.ts";
import { useGrapeStore } from "@/stores/grapeStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";
import { useWineListStore } from "@/stores/wineListStore.ts";
import { useAuthStore } from "@/stores/authStore.ts";

const { fetchCountries } = useCountryStore();
const { fetchGrapes } = useGrapeStore();
const { fetchRegions } = useRegionStore();
const { getActiveList } = useWineListStore();
const { getMe } = useAuthStore();

Promise.allSettled([
  getMe(),
  fetchRegions(),
  fetchGrapes(),
  fetchCountries(),
  getActiveList(),
]);
</script>

<template>
  <div class="layout-wrapper">
    <app-topbar></app-topbar>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <Toast />
</template>
