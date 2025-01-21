<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCountryStore } from "@/stores/countryStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";
import { computed, ref } from "vue";
import { useWineListStore } from "@/stores/wineListStore.ts";
import {
  getCategoryLabelByValue,
  getColourLabelByValue,
  getSugarTypeLabelByValue,
} from "w-list-api";
import WineDetailsDialog from "@/components/WineDetailsDialog.vue";
import { vintage } from "../utils/vintage.ts";

const { getRegionNameById } = useRegionStore();
const { getCountryNameById } = useCountryStore();
const { activeWineList } = storeToRefs(useWineListStore());

const namingFunctions = {
  Категории: getCategoryLabelByValue,
  Страны: (key: any) => getCountryNameById(+key),
  Виноград: (key: any) => key,
  Регионы: (key: any) => getRegionNameById(+key),
  "Тип сахара": getSugarTypeLabelByValue,
  Цвет: getColourLabelByValue,
};

const tabContent = computed(() => [
  { title: "Категории", items: activeWineList.value?.categories },
  { title: "Страны", items: activeWineList.value?.countries },
  { title: "Виноград", items: activeWineList.value?.grapes },
  { title: "Регионы", items: activeWineList.value?.regions },
  { title: "Тип сахара", items: activeWineList.value?.sugarTypes },
  { title: "Цвет", items: activeWineList.value?.colours },
]);

const getNamingKey = (key: any, item: any) => {
  const namingFunction = namingFunctions[item.title];
  return namingFunction ? namingFunction(key) : key;
};

const showDetails = ref(false);
const selectWine = ref(null);

const showWineDetails = (data: any) => {
  selectWine.value = data;
  showDetails.value = true;
};
</script>

<template>
  <div class="card p-0">
    <Tabs :value="0" scrollable>
      <TabList>
        <Tab v-for="(tab, index) in tabContent" :key="index" :value="index">
          {{ tab.title }}
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel
          v-for="(tab, index) in tabContent"
          :key="index"
          :value="index"
        >
          <div class="mb-12" v-for="(item, key) in tab.items" :key="key">
            <DataTable
              :value="item.items"
              tableStyle="min-width: 50rem"
              stripedRows
            >
              <template #header>
                <div
                  class="text-2xl font-semibold"
                  style="color: var(--primary-color)"
                >
                  {{ getNamingKey(key, tab) }}
                </div>
              </template>
              <Column field="vintage" class="w-14">
                <template #body="{ data }">
                  {{ vintage(data.wine.vintage) }}</template
                >
              </Column>
              <Column field="name">
                <template #body="{ data }">
                  <div @click="showWineDetails(data)">
                    <div>{{ data.wine.name }}</div>
                    <div style="color: var(--primary-color)">
                      {{ getCountryNameById(data.wine.countryId) }},
                      {{ getRegionNameById(data.wine.regionId) }}
                    </div>
                  </div>
                </template>
              </Column>
              <Column field="pricePerGlass" sortable class="w-[300px]">
                <template #body="{ data }">
                  <WinePrice
                    :price-per-glass="data.pricePerGlass"
                    :price-per-bottle="data.pricePerBottle"
                    :bottle-volume="data.wine.bottleVolume"
                  />
                </template>
              </Column>
            </DataTable>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <div v-if="selectWine">
      <WineDetailsDialog
        v-model:show="showDetails"
        :wine="selectWine.wine"
        :price-per-bottle="selectWine.pricePerBottle"
        :price-per-glass="selectWine.pricePerGlass"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.square {
  width: 100%;
  aspect-ratio: 1;
}
</style>
