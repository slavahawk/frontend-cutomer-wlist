<template>
  <div @click="$router.push({ name: AppRoutes.TABS })">
    <img :src="MainBanner" class="bgExampleClass" alt="">
  </div>
</template>

<script setup lang="ts">
import { AppRoutes } from "@/router";
import MainBanner from "@/assets/images/main.jpeg";
</script>

<style scoped lang="scss">
.mainBanner {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  &__content {
    z-index: 1;
  }
}

.bgExampleClass {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 0;
  }
}
</style>
