<template>
  <Drawer
    v-model:visible="isVisible"
    header=" "
    position="full"
    class="drawerCustom"
  >
    <swiper-container
      class="mySwiper"
      ref="swiperContainer"
      :initialSlide="findIndex"
      :slides-per-view="1.2"
      :centeredSlides="true"
      :space-between="20"
      :virtual="true"
    >
      <swiper-slide
        v-for="(wine, index) in selectedWines"
        :key="wine.id"
        :virtual-index="index"
      >
        <WineCard
          :img="imgSelect(wine.wine)"
          :name="wine.wine.name"
          :country="countryNames[wine.wine.countryId]"
          :region="regionNames[wine.wine.regionId]"
          :grapes="getGrapesNameById(wine.wine.grapeIds)"
          :interestingFacts="wine.wine.interestingFacts"
          :vintage="vintage(wine.wine.vintage)"
          :category="getCategoryLabelByValue(wine.wine.category)"
          :colour="getColourLabelByValue(wine.wine.colour)"
          :alcoholByVolume="wine.wine.alcoholByVolume"
          :sugarType="getSugarTypeLabelByValue(wine.wine.sugarType)"
          :organoleptic="wine.wine.organoleptic"
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
    </swiper-container>
  </Drawer>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from "vue";
import { vintage } from "w-list-utils";
import {
  getCategoryLabelByValue,
  getColourLabelByValue,
  getSugarTypeLabelByValue,
} from "w-list-api";
import { type Wine, type WineListItem } from "wlist-types";
import { useCountryStore } from "@/stores/countryStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";
import { useGrapeStore } from "@/stores/grapeStore.ts";
import { register } from "swiper/element";
import { WineCard, WinePriceGlass, WinePriceBottle } from "w-list-components";

// Register Swiper elements
register();

const swiperContainer = ref<HTMLElement | null>(null);

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

// Helper function to get img based on screen size
const imgSelect = (wine: Wine) =>
  window.innerWidth >= 768 ? wine.originalImagePath : wine.mediumImagePath;

// Computed properties for wine information
const countryNames = computed(() => {
  return getNamesById(props.selectedWines, getCountryNameById, "countryId");
});

const regionNames = computed(() => {
  return getNamesById(props.selectedWines, getRegionNameById, "regionId");
});

// Helper function to generate names by IDs
function getNamesById(
  wines: WineListItem[],
  getNameFn: (id: number) => string | null,
  idKey: string,
) {
  return wines.reduce(
    (acc, wine) => {
      acc[wine.wine[idKey]] = getNameFn(wine.wine[idKey]);
      return acc;
    },
    {} as Record<number, string | null>,
  );
}

// Find index of the selected wine
const findIndex = computed(() => {
  const index = props.selectedWines.findIndex(
    (w) => w.id === props.selectWineId,
  );
  return index !== -1 ? index : 0; // Default to 0 if not found
});

// Handle Drawer visibility and Swiper initialization
const isVisible = computed({
  get() {
    return props.show;
  },
  set(value) {
    emit("update:show", value);
  },
});

// Watch for visibility change to initialize Swiper
watch(
  () => isVisible.value,
  async (val) => {
    if (val) {
      await nextTick();
      if (swiperContainer.value) {
        const swiper = swiperContainer.value.swiper;

        if (swiper) {
          // Update Swiper with the new slides
          swiper.update();
        } else {
          console.error("Swiper instance not found");
        }
      } else {
        console.error("Swiper element not found");
      }
    }
  },
);
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
    padding: 0 0 var(--p-overlay-modal-padding) !important;
  }
}

.mySwiper {
  width: 100%;
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
