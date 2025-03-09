<template>
  <swiper-container
    :initialSlide="props.slideTo"
    init="false"
    class="mySwiper"
    virtual
    :slides-per-view="1.15"
    :centeredSlides="true"
    :space-between="20"
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
  };
  Object.assign(swiperEl, params);

  swiperEl.initialize();
});
</script>

<style lang="scss">
.mySwiper {
  width: 100%;
  //max-width: 800px;
  //height: 86vh;
  height: 100%;
  margin: 0 auto;

  swiper-slide {
    display: flex;
    justify-content: center;
    border-radius: 18px;
    background: var(--surface-card);
    padding: 24px;
  }
}
</style>
