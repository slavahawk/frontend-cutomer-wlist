<template>
  <div class="mainBanner" @click="$router.push({ name: AppRoutes.TABS })">
    <img :src="MainBanner" class="bgExampleClass" alt="Main" />
  </div>
</template>

<script setup lang="ts">
import { AppRoutes } from "@/router";
import MainBanner from "@/assets/images/main.png";
</script>

<style scoped lang="scss">
.mainBanner {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* Ensure the image is positioned relative to this container */

  &__content {
    z-index: 1;
  }
}

.bgExampleClass {
  width: 100%; /* set the width to fill the container */
  height: 100%; /* set the height to fill the container */
  object-fit: cover; /* ensures the image covers the area */
  position: absolute; /* positions the image absolutely in the parent */
  top: 0;
  left: 0;
  z-index: 0; /* set the z-index to be behind the content */
}
</style>
