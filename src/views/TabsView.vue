<script setup lang="ts">
import FloatingConfigurator from "@/components/FloatingConfigurator.vue";
import WineDetailsDialog from "@/components/WineDetailsDialog.vue";
import { AppRoutes } from "@/router";
import { useCountryStore } from "@/stores/countryStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";
import { useWineListStore } from "@/stores/wineListStore.ts";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getCategoryLabelByValue,
  getColourLabelByValue,
  getSugarTypeLabelByValue,
  type WineListItem,
} from "w-list-api";
import { WinePriceBottle, WinePriceGlass } from "w-list-components";
import { vintage } from "w-list-utils";

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
  selectWineId.value = data.id;
  selectedWines.value = item.items;
  showDetails.value = true;
};

const activeTab = ref(0);
const router = useRouter();
const route = useRoute();

watch(activeTab, (val) => {
  router.push({ name: AppRoutes.TABS, query: { activeTab: val } });
});

if (route.query?.activeTab) {
  activeTab.value = +route.query.activeTab;
}
</script>

<template>
  <FloatingConfigurator v-show="false" />
  <div class="card p-0">
    <Tabs v-model:value="activeTab" scrollable>
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
          <Accordion multiple>
            <AccordionPanel
              :value="key"
              v-for="(item, key) in tab.items"
              :key="key"
            >
              <AccordionHeader>
                <div class="text-2xl font-semibold flex gap-2">
                  <span style="color: var(--primary-color)"
                    >{{ getNamingKey(key, tab) }}
                  </span>
                </div></AccordionHeader
              >
              <AccordionContent>
                <DataTable :value="item.items">
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
                  <Column field="pricePerGlass" header="Цена за бокал" sortable class="w-[200px]">
                    <template #body="{ data }">
                       <WinePriceGlass
                        :price-per-glass="data.pricePerGlass"
                        :glass-volume="data?.glassVolume"
                      />
                    </template>
                  </Column>
                  <Column field="pricePerBottle" header="Цена за бутылку" sortable class="w-[200px]">
                    <template #body="{ data }">
                       <WinePriceBottle
                        :price-per-bottle="data.pricePerBottle"
                        :bottle-volume="data.wine.bottleVolume"
                      />
                    </template>
                  </Column>
                </DataTable>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
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

<style>
.p-accordionheader {
  justify-content: start !important;
  gap: 24px !important;
}
</style>
