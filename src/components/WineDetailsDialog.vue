<template>
  <Drawer v-model:visible="isVisible" header=" " position="full">
    <SliderComponent v-if="selectedWines">
      <SwiperSlide v-for="wine in selectedWines" :key="wine.id">
        <WineCard
          :originalImagePath="wine.wine.originalImagePath"
          :name="wine.wine.name"
          :alcohol-by-volume="wine.wine.alcoholByVolume"
          :interesting-facts="wine.wine.interestingFacts"
          :organoleptic="wine.wine.organoleptic"
          :vintage="vintage(wine.wine.vintage)"
          :sugar-type="getSugarTypeLabelByValue(wine.wine.sugarType)"
          :country="getCountryNameById(wine.wine.countryId)"
          :category="getCategoryLabelByValue(wine.wine.category)"
          :colour="getColourLabelByValue(wine.wine.colour)"
          :region="getRegionNameById(wine.wine.regionId)"
        >
          <p class="mb-4">
            <WinePrice
              :price-per-glass="wine?.pricePerGlass"
              :price-per-bottle="wine.pricePerBottle"
              :bottle-volume="wine.wine.bottleVolume"
              :glass-volume="wine.glassVolume"
            />
          </p>
        </WineCard>
      </SwiperSlide>
    </SliderComponent>
  </Drawer>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { WineCard, WinePrice } from "w-list-components";
import { vintage } from "w-list-utils";
import {
  getCategoryLabelByValue,
  getColourLabelByValue,
  getSugarTypeLabelByValue,
  type WineListItem,
} from "w-list-api"; // Импортируйте тип Wine, если это необходимо
import { useCountryStore } from "@/stores/countryStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";
import SliderComponent from "@/components/SliderComponent.vue";
import { SwiperSlide } from "swiper/vue";

const { getCountryNameById } = useCountryStore();
const { getRegionNameById } = useRegionStore();

const emit = defineEmits<{
  (e: "update:show", bol: boolean): void;
}>();

const props = defineProps<{
  show: boolean;
  selectedWines: WineListItem;
  selectWineId: number;
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

<style>
.p-drawer {
  background: none !important;
}

.p-drawer-header {
  button {
    background: white !important;
  }
}
</style>
