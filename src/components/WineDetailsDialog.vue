<template>
  <Drawer v-model:visible="isVisible" header=" " position="full">
    <SliderComponent>
      <WineCard
        :originalImagePath="wine.originalImagePath"
        :name="wine.name"
        :alcohol-by-volume="wine.alcoholByVolume"
        :interesting-facts="wine.interestingFacts"
        :organoleptic="wine.organoleptic"
        :vintage="vintage(wine.vintage)"
        :sugar-type="getSugarTypeLabelByValue(wine.sugarType)"
        :country="getCountryNameById(wine.countryId)"
        :category="getCategoryLabelByValue(wine.category)"
        :colour="getColourLabelByValue(wine.colour)"
        :region="getRegionNameById(wine.regionId)"
      >
        <p class="mb-4">
          <WinePrice
            :price-per-glass="pricePerGlass"
            :price-per-bottle="pricePerBottle"
            :bottle-volume="wine.bottleVolume"
            :glass-volume="glassVolume"
          />
        </p>
      </WineCard>
    </SliderComponent>
  </Drawer>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { WinePrice, WineCard } from "w-list-components";
import { vintage } from "w-list-utils";
import {
  getCategoryLabelByValue,
  getColourLabelByValue,
  getSugarTypeLabelByValue,
  type Wine,
} from "w-list-api"; // Импортируйте тип Wine, если это необходимо
import { useCountryStore } from "@/stores/countryStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";
import SliderComponent from "@/components/SliderComponent.vue";

const { getCountryNameById } = useCountryStore();
const { getRegionNameById } = useRegionStore();

const emit = defineEmits<{
  (e: "update:show", bol: boolean): void;
}>();

const props = defineProps<{
  show: boolean;
  wine: Wine | null;
  pricePerGlass?: number;
  pricePerBottle: number;
  glassVolume?: number;
}>();

const isVisible = computed({
  get() {
    return props.show;
  },
  set(value) {
    emit("update:show", value);
  },
});
</script>

<style scoped></style>
