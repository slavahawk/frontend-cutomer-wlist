<template>
  <DataTable :value="data" tableStyle="min-width: 50rem">
    <template #empty>
      <span class="text-center">Вина отсутствуют</span>
    </template>
    <Column field="vintage" class="w-14">
      <template #body="{ data }">
        <span
          v-if="showVintage(data.category)"
          class="cursor-pointer"
          @click="emit('showWineDetails', data.id)"
        >
          {{ vintage(data.wine.vintage) }}
        </span>
      </template>
    </Column>
    <Column field="name">
      <template #body="{ data }">
        <div class="cursor-pointer" @click="emit('showWineDetails', data.id)">
          <div>{{ data.wine.name }}</div>
          <div style="color: var(--p-primary-400)">
            {{ getCountryNameById(data.wine.countryId) }},
            {{ getRegionNameById(data.wine.regionId) }}
          </div>
        </div>
      </template>
    </Column>
    <Column v-if="isGlass" field="pricePerGlass" class="w-[200px]">
      <template #body="{ data }">
        <WinePriceGlass
          :price-per-glass="data.pricePerGlass"
          :glass-volume="data?.glassVolume"
          @click="emit('showWineDetails', data.id)"
        />
      </template>
    </Column>
    <Column v-else field="pricePerBottle" class="w-[200px]">
      <template #body="{ data }">
        <WinePriceBottle
          :price-per-bottle="data.pricePerBottle"
          :bottle-volume="data.wine.bottleVolume"
          @click="emit('showWineDetails', data.id)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { type WineListItem } from "wlist-types";
import { WinePriceBottle, WinePriceGlass } from "w-list-components";
import { showVintage, vintage } from "w-list-utils";
import { useCountryStore } from "@/stores/countryStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";

const { getCountryNameById } = useCountryStore();
const { getRegionNameById } = useRegionStore();

defineProps<{
  data: WineListItem[];
  isGlass: boolean;
}>();

const emit = defineEmits<{
  (e: "showWineDetails", id: number): void;
}>();
</script>
