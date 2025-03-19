<template>
  <DataTable :value="items" tableStyle="min-width: 50rem" class="TableCustom">
    <template #empty>
      <span class="text-center">Вина отсутствуют</span>
    </template>
    <Column field="vintage" class="w-14">
      <template #body="{ data }">
        <span
          @click="$emit('item-click', { allWines: items, selectWine: data })"
          class="cursor-pointer"
        >
          {{ vintage(data.wine.vintage) }}
        </span>
      </template>
    </Column>
    <Column field="name">
      <template #body="{ data }">
        <div
          @click="$emit('item-click', { allWines: items, selectWine: data })"
          class="cursor-pointer"
        >
          <div>{{ data.wine.name }}</div>
          <div style="color: var(--p-primary-400)">
            {{ getCountryNameById(data.wine.countryId) }},
            {{ getRegionNameById(data.wine.regionId) }}
          </div>
        </div>
      </template>
    </Column>
    <Column
      field="pricePerGlass"
      class="w-[200px]"
      v-if="title === 'По бокалам'"
    >
      <template #body="{ data }">
        <WinePriceGlass
          :price-per-glass="data.pricePerGlass"
          :glass-volume="data?.glassVolume"
          @click="$emit('item-click', { allWines: items, selectWine: data })"
        />
      </template>
    </Column>
    <Column field="pricePerBottle" class="w-[200px]" v-else>
      <template #body="{ data }">
        <WinePriceBottle
          :price-per-bottle="data.pricePerBottle"
          :bottle-volume="data.wine.bottleVolume"
          @click="$emit('item-click', { allWines: items, selectWine: data })"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { type WineListItem } from "w-list-api";
import { WinePriceBottle, WinePriceGlass } from "w-list-components";
import { vintage } from "w-list-utils";
import { useCountryStore } from "@/stores/countryStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";

const { getCountryNameById } = useCountryStore();
const { getRegionNameById } = useRegionStore();

const props = defineProps<{
  items: WineListItem[];
  title: string;
}>();
</script>

<style lang="scss">
.TableCustom {
  .p-datatable-header-cell {
    padding: 0 !important;
  }
}
</style>
