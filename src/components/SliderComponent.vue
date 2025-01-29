<template>
  <swiper-container
    :initialSlide="props.slideTo"
    init="false"
    effect="cards"
    class="mySwiper"
    virtual
  >
    <slot />
  </swiper-container>
</template>
<script lang="ts" setup>
import { register } from "swiper/element";
import { EffectCards } from "swiper/modules";
import { onMounted } from "vue";

register();

interface Props {
  slideTo: number;
}

const props = defineProps<Props>();

// const onSwiper = (swiper: any) => {
//   swiper.slideTo(props.slideTo);
// };

onMounted(() => {
  const swiperEl = document.querySelector("swiper-container");

  const params = {
    modules: [EffectCards],
    // inject modules styles to shadow DOM
  };
  Object.assign(swiperEl, params);

  swiperEl.initialize();
});
</script>

<style lang="scss">
.mySwiper {
  width: 100%;
  max-width: 800px;
  height: 86vh;
  margin: 0 auto;

  swiper-slide {
    display: flex;
    justify-content: center;
    border-radius: 18px;
    background: var(--surface-card);
    box-shadow:
      0 8px 16px 0 var(--primary-contrast-color),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 24px;
  }
}
</style>
