<template>
  <swiper
    :effect="'cards'"
    :grabCursor="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="item in 6"> <slot></slot></swiper-slide>
  </swiper>
</template>
<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

const modules = [EffectCards];
</script>

<style lang="scss">
.swiper {
  width: 80vw;
  height: 80vh;
}

.swiper-slide {
  display: flex;
  //align-items: center;
  justify-content: center;
  border-radius: 18px;
  //font-size: 22px;
  //font-weight: bold;
  //color: #fff;
  background: white;
  box-shadow:
    0 8px 16px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 12px;
}
</style>
