<template>
  <div class="mainBanner" @click="router.push({ name: AppRoutes.TABS })">
    <ProgressSpinner v-if="loading" />
    <img
      v-else
      :src="currentImagePath"
      class="bgExampleClass"
      alt="Main"
      @error="onImageError"
    />
  </div>
</template>

<script setup lang="ts">
import { AppRoutes } from "@/router";
import MainBanner from "@/assets/images/main.png";
import { useActiveInfo } from "@/stores/activeInfo.ts";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";

const router = useRouter();
const { info, loading } = storeToRefs(useActiveInfo());

const currentImagePath = ref("");

watch(info, (val) => {
  if (val?.imagePath) {
    currentImagePath.value = val?.imagePath;
  }
});

const onImageError = () => {
  currentImagePath.value = MainBanner; // Fallback to the main image if the load fails
};
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
