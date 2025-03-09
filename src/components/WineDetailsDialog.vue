<template>
  <Drawer
    v-model:visible="isVisible"
    header=" "
    position="full"
    class="drawerCustom"
  >
    <SliderComponent v-if="selectedWines" :slideTo="findIndex">
      <swiper-slide v-for="wine in selectedWines" :key="wine.id" lazy>
        <WineCard
          :img="imgSelect(wine.wine)"
          :name="wine.wine.name"
          :alcohol-by-volume="wine.wine.alcoholByVolume"
          :interesting-facts="wine.wine.interestingFacts"
          :organoleptic="wine.wine.organoleptic"
          :vintage="vintage(wine.wine.vintage)"
          :grapes="grapesNames[wine.id]"
          :sugar-type="getSugarTypeLabelByValue(wine.wine.sugarType)"
          :country="countryNames[wine.wine.countryId]"
          :category="getCategoryLabelByValue(wine.wine.category)"
          :colour="getColourLabelByValue(wine.wine.colour)"
          :region="regionNames[wine.wine.regionId]"
        >
          <p class="mb-4 flex gap-2 items-center">
            <WinePriceGlass
              :price-per-glass="wine.pricePerGlass"
              :glass-volume="wine?.glassVolume"
            />
            <WinePriceBottle
              :price-per-bottle="wine.pricePerBottle"
              :bottle-volume="wine.wine.bottleVolume"
            />
          </p>
        </WineCard>
      </swiper-slide>
    </SliderComponent>
  </Drawer>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { WineCard, WinePriceBottle, WinePriceGlass } from "w-list-components";
import { vintage } from "w-list-utils";
import {
  getCategoryLabelByValue,
  getColourLabelByValue,
  getSugarTypeLabelByValue,
  type Wine,
  type WineListItem,
} from "w-list-api";
import { useCountryStore } from "@/stores/countryStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";
import SliderComponent from "@/components/SliderComponent.vue";
import { useGrapeStore } from "@/stores/grapeStore.ts";

const { getCountryNameById } = useCountryStore();
const { getRegionNameById } = useRegionStore();
const { getGrapesNameById } = useGrapeStore();

const emit = defineEmits<{
  (e: "update:show", bol: boolean): void;
}>();

const props = defineProps<{
  show: boolean;
  selectedWines: WineListItem[];
  selectWineId: number;
}>();

const imgSelect = (wine: Wine) => {
  return window.innerWidth >= 768
    ? wine.originalImagePath
    : wine.mediumImagePath;
};

// Получение имен сортов винограда для всех выбранных вин
const grapesNames = computed(() => {
  return props.selectedWines.reduce(
    (acc, wine) => {
      acc[wine.id] = getGrapesNameById(wine.wine.grapeIds);
      return acc;
    },
    {} as Record<number, string | null>,
  );
});

// Получение имен стран для всех выбранных вин
const countryNames = computed(() => {
  return props.selectedWines.reduce(
    (acc, wine) => {
      acc[wine.wine.countryId] = getCountryNameById(wine.wine.countryId);
      return acc;
    },
    {} as Record<number, string | null>,
  );
});

// Получение имен регионов для всех выбранных вин
const regionNames = computed(() => {
  return props.selectedWines.reduce(
    (acc, wine) => {
      acc[wine.wine.regionId] = getRegionNameById(wine.wine.regionId);
      return acc;
    },
    {} as Record<number, string | null>,
  );
});

const findIndex = computed(() => {
  return props.selectedWines.findIndex(
    (w: WineListItem) => w.id === props.selectWineId,
  );
});

const isVisible = computed({
  get() {
    return props.show;
  },
  set(value) {
    emit("update:show", value);
  },
});
</script>

<style lang="scss">
.drawerCustom {
  background: none !important;

  .p-drawer-header {
    padding: 0.5rem 1.25rem !important;
    button {
      background: white !important;
    }
  }

  .p-drawer-content {
    overflow: hidden !important;
    padding: 0 0 var(--p-overlay-modal-padding) 0 !important;
  }
}
</style>
