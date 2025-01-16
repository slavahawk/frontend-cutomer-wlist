<script setup lang="ts">
import FloatingConfigurator from "@/components/FloatingConfigurator.vue";
import { AppRoutes } from "@/router";
</script>

<template>
  <FloatingConfigurator />
  <div class="mainBanner">
    <img src="@/assets/images/main.jpeg" alt="Main" />
    <Button @click="$router.push({ name: AppRoutes.TABS })" size="large">
      Винная карта
    </Button>
  </div>
</template>

<style scoped lang="scss">
.mainBanner {
  min-height: 100vh;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
