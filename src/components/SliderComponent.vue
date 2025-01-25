<template>
  <swiper
    :effect="'cards'"
    :grabCursor="true"
    :modules="modules"
    class="mySwiper"
  >
    <slot />
  </swiper>
</template>
<script lang="ts" setup>
import { Swiper } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

const modules = [EffectCards];
</script>

<style lang="scss">
.swiper {
  width: 80vw;
  height: 86vh;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  border-radius: 18px;
  background: var(--surface-card);
  box-shadow:
    0 8px 16px 0 var(--primary-contrast-color),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 24px;
}
</style>
