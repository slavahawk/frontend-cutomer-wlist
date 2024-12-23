<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
    <img
        class="w-full h-48 object-cover"
        :src="wine.originalImagePath"
        alt="Wine Image"
    />
    {{wine.originalImagePath}}
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ wine.name }}</div>
      <p class="text-gray-700 text-base">
        <strong>Категория:</strong> {{ wine.category }}<br />
        <strong>Цвет:</strong> {{ wine.colour }}<br />
        <strong>Год:</strong> {{ wine.vintage }}<br />
        <strong>Тип сахара:</strong> {{ wine.sugarType }}<br />
        <strong>Объем бутылки:</strong> {{ wine.bottleVolume }} л<br />
        <strong>Алкоголь:</strong> {{ roundedAlcohol }}%
      </p>
    </div>
    <div class="px-6 py-4">
      <div class="flex items-center">
        <img
            class="w-6 h-6 mr-2"
            :src="wine.country.originalImagePath"
            alt="Country Image"
        />
        <span class="text-gray-700">{{ wine.country.name }}</span>
      </div>
      <p class="text-gray-600 mt-2"><strong>Интересные факты:</strong> {{ wine.interestingFacts }}</p>
      <p class="text-gray-600 mt-2"><strong>Органолептические свойства:</strong> {{ wine.organoleptic }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, defineProps} from "vue";

import type {Wine} from "@/types/wine";


const props = defineProps<{
  wine: Wine
}>()

// const wine = ref({
//   id: 1,
//   name: "California Maki",
//   category: "ROSE",
//   colour: "RED",
//   vintage: 2002,
//   sugarType: "SEMI_DRY",
//   bottleVolume: 0.75,
//   alcoholByVolume: 8.070098344901249,
//   country: {
//     id: 7,
//     name: "Germany",
//     originalImagePath: "/images/countries/pdf"
//   },
//   originalImagePath: "/images/wines/js",
//   interestingFacts: "harum",
//   organoleptic: "ut"
// });

const roundedAlcohol = computed(() => {
  return Number(Math.round(props.wine.alcoholByVolume + 'e' + 2) + 'e-' + 2);
});
</script>

<style scoped>
/* Вы можете добавить дополнительные стили, если необходимо */
</style>
