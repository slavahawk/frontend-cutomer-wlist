<script setup lang="ts">
import AppTopbar from "./AppTopbar.vue";

</script>

<template>
  <div class="layout-wrapper">
    <app-topbar></app-topbar>
<!--    <app-sidebar></app-sidebar>-->
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <Toast />
</template>
