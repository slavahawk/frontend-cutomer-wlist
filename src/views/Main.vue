<script setup lang="ts">
import FloatingConfigurator from "@/components/FloatingConfigurator.vue";
import { AppRoutes } from "@/router";
import Logo from "@/assets/images/svg/Logo.vue";
</script>

<template>
  <FloatingConfigurator class="z-50" />
  <div class="mainBanner">
    <div class="mainBanner__content">
      <Logo />

      <!--      <img src="@/assets/images/main.jpeg" alt="" />-->
      <Button
        raised
        @click="$router.push({ name: AppRoutes.TABS })"
        class="mt-12"
        ><span class="text-3xl">Винная карта</span></Button
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.mainBanner {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__content {
  }
}
</style>
