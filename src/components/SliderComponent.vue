<template>
  <swiper
    :effect="'cards'"
    :grabCursor="true"
    :modules="modules"
    class="mySwiper"
    @swiper="onSwiper"
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

interface Props {
  slideTo: number;
}

const props = defineProps<Props>();

console.log(props.slideTo);

const onSwiper = (swiper: any) => {
  swiper.slideTo(props.slideTo);
};
</script>

<style lang="scss">
.swiper {
  width: 86vw;
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
