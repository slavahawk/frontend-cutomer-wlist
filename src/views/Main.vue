<script setup lang="ts">
import FloatingConfigurator from "@/components/FloatingConfigurator.vue";
import { AppRoutes } from "@/router";
</script>

<template>
  <FloatingConfigurator class="z-50" />
  <div class="mainBanner">
    <div class="overlay"></div>
    <!-- Затемнение -->
    <Button @click="$router.push({ name: AppRoutes.TABS })" size="large">
      Винная карта
    </Button>
  </div>
</template>

<style scoped lang="scss">
.mainBanner {
  height: 100vh;
  background-image: url("@/assets/images/main.jpeg");
  background-size: cover; /* Заполнение */
  background-position: center; /* Центрирование */
  position: relative; /* Для абсолютного позиционирования overlay */
  overflow: hidden;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Затемнение */
    z-index: 10; /* Обеспечивает слой выше фона */
  }

  button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20; /* Обеспечьте наличие более высокого z-index для кнопки */
  }
}
</style>
