<script setup lang="ts">
import AppTopbar from "./AppTopbar.vue";

import { useCountryStore } from "@/stores/countryStore.ts";
import { useGrapeStore } from "@/stores/grapeStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";

const { fetchCountries } = useCountryStore();
const { fetchGrapes } = useGrapeStore();
const { fetchRegions } = useRegionStore();

fetchRegions();
fetchGrapes();
fetchCountries();
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
