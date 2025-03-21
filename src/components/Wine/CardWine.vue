<template>
  <Card class="max-w-sm">
    <template #title>
      {{ wine.name }}
    </template>
    <template #subtitle>
      {{ `Год: ${wine.vintage}` }}
    </template>
    <template #header>
      <img
        class="w-full h-48 object-cover"
        :src="wine.originalImagePath"
        alt="Wine Image"
        @error="handleImageError"
      />
    </template>
    <template #content>
      <div class="card-content">
        <p><strong>Категория:</strong> {{ wine.category }}</p>
        <p><strong>Цвет:</strong> {{ wine.colour }}</p>
        <p><strong>Уровень сахара:</strong> {{ wine.sugarType }}</p>
        <p><strong>Объем бутылки:</strong> {{ wine.bottleVolume }} л</p>
        <p><strong>Алкоголь:</strong> {{ roundedAlcohol }}%</p>
      </div>
    </template>
    <template #footer>
      <div class="flex items-center">
        <img
          class="w-6 h-6 mr-2"
          :src="wine.country?.originalImagePath"
          alt="Country Image"
          @error="handleImageError"
        />
        <span>{{ wine.country?.name }}</span>
      </div>
      <div class="mt-2">
        <p><strong>Интересные факты:</strong> {{ wine.interestingFacts }}</p>
        <p>
          <strong>Органолептические свойства:</strong> {{ wine.organoleptic }}
        </p>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { type Wine } from "w-list-api";
import { handleImageError } from "@/utils/handleImageError.ts";

const props = defineProps<{ wine: Wine }>();

const roundedAlcohol = computed(() => {
  const alcoholVolume = props.wine.alcoholByVolume;
  return Number(Math.round(alcoholVolume * 100) / 100);
});
</script>

<style scoped>
.card-content {
  padding: 12px 0;
}
</style>
