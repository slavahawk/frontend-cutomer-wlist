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
  type WineListItem,
} from "w-list-api";
import WineDetailsDialog from "@/components/WineDetailsDialog.vue";
import { vintage } from "w-list-utils";
import { WinePrice } from "w-list-components";
import FloatingConfigurator from "@/components/FloatingConfigurator.vue";

const { getRegionNameById } = useRegionStore();
const { getCountryNameById } = useCountryStore();
const { activeWineList } = storeToRefs(useWineListStore());

const categoryName = "Категории";
const countryName = "Страны";
const grapesName = "Виноград";
const regionName = "Регионы";
const sugarTypename = "Тип сахара";
const colourName = "Цвет";

const namingFunctions = {
  Категории: getCategoryLabelByValue,
  Страны: (key: any) => getCountryNameById(+key),
  Виноград: (key: any) => key,
  Регионы: (key: any) => getRegionNameById(+key),
  "Тип сахара": getSugarTypeLabelByValue,
  Цвет: getColourLabelByValue,
};

const tabContent = computed(() => [
  { title: categoryName, items: activeWineList.value?.categories },
  { title: countryName, items: activeWineList.value?.countries },
  { title: grapesName, items: activeWineList.value?.grapes },
  { title: regionName, items: activeWineList.value?.regions },
  { title: sugarTypename, items: activeWineList.value?.sugarTypes },
  { title: colourName, items: activeWineList.value?.colours },
]);

const getNamingKey = (key: any, item: any) => {
  const namingFunction = namingFunctions[item.title];
  return namingFunction ? namingFunction(key) : key;
};

const showDetails = ref(false);
const selectWineId = ref<number | null>(null);
const selectedWines = ref<WineListItem[] | null>(null);

const showWineDetails = (data: any, item: any) => {
  console.log(item);
  selectWineId.value = data.id;
  selectedWines.value = item.items;
  showDetails.value = true;
};
</script>

<template>
  <FloatingConfigurator v-show="false" />
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
                  <div
                    class="cursor-pointer"
                    @click="showWineDetails(data, item)"
                  >
                    <div>{{ data.wine.name }}</div>
                    <div style="color: var(--primary-color)">
                      {{ getCountryNameById(data.wine.countryId) }},
                      {{ getRegionNameById(data.wine.regionId) }}
                    </div>
                  </div>
                </template>
              </Column>
              <Column field="pricePerGlass" sortable class="w-[320px]">
                <template #body="{ data }">
                  <WinePrice
                    :price-per-glass="data.pricePerGlass"
                    :price-per-bottle="data.pricePerBottle"
                    :bottle-volume="data.wine.bottleVolume"
                    :glass-volume="data?.glassVolume"
                  />
                </template>
              </Column>
            </DataTable>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <div v-if="selectedWines">
      <WineDetailsDialog
        v-model:show="showDetails"
        :selectedWines="selectedWines"
        :selectWineId="selectWineId"
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
