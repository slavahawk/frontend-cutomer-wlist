<script setup lang="ts">
import { AppRoutes } from "@/router";
import { useActiveInfo } from "@/stores/activeInfo.ts";
import { storeToRefs } from "pinia";
const { info } = storeToRefs(useActiveInfo());
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <Button
        icon="pi pi-arrow-circle-left"
        @click="$router.push({ name: AppRoutes.MAIN })"
      />
    </div>
    <div class="layout-topbar-actions">
      {{ info?.shopName }}
    </div>
  </div>
</template>
