<template>
  <div class="bgExampleClass">
    <FloatingConfigurator class="z-50" />
    <div class="mainBanner">
      <div class="mainBanner__content">
        <Button raised @click="$router.push({ name: AppRoutes.TABS })">
          <span class="text-3xl">Винная карта</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FloatingConfigurator from "@/components/FloatingConfigurator.vue";
import { AppRoutes } from "@/router";
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
  background-image: url("./main.jpeg");
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
