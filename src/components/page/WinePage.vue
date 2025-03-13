<template>
  <div class="layout-wrapper">
    <app-topbar></app-topbar>
    <div class="layout-main-container">
      <div class="layout-main">
        <div class="card !p-0 customBlock">
          <Tabs v-model:value="activeTab" scrollable>
            <TabList>
              <Tab
                v-for="(tab, index) in tabContent"
                :key="index"
                :value="index"
              >
                {{ tab.title }}
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel
                v-for="(tab, index) in tabContent"
                :key="index"
                :value="index"
              >
                <Accordion v-model:value="activeAccordion" multiple>
                  <AccordionPanel
                    :value="key"
                    v-for="(item, key) in tab.items"
                    :key="key"
                  >
                    <AccordionHeader>
                      <div class="text-2xl font-semibold flex gap-2">
                        <span style="color: var(--primary-color)">
                          {{ getNamingKey(key, tab) }}
                        </span>
                      </div>
                    </AccordionHeader>
                    <AccordionContent>
                      <DataTable
                        :value="item.items"
                        tableStyle="min-width: 50rem"
                      >
                        <template #empty
                          ><span class="text-center"
                            >Вина отсутвуют</span
                          ></template
                        >
                        <Column field="vintage" class="w-14">
                          <template #body="{ data }">
                            <span
                              class="cursor-pointer"
                              @click="showWineDetails(data, item)"
                              >{{ vintage(data.wine.vintage) }}</span
                            ></template
                          >
                        </Column>
                        <Column field="name">
                          <template #body="{ data }">
                            <div
                              class="cursor-pointer"
                              @click="showWineDetails(data, item)"
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
                          v-if="tab.title === glassItemsName"
                        >
                          <template #body="{ data }">
                            <WinePriceGlass
                              :price-per-glass="data.pricePerGlass"
                              :glass-volume="data?.glassVolume"
                              @click="showWineDetails(data, item)"
                            />
                          </template>
                        </Column>
                        <Column field="pricePerBottle" class="w-[200px]" v-else>
                          <template #body="{ data }">
                            <WinePriceBottle
                              :price-per-bottle="data.pricePerBottle"
                              :bottle-volume="data.wine.bottleVolume"
                              @click="showWineDetails(data, item)"
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WineDetailsDialog from "@/components/WineDetailsDialog.vue";
import { AppRoutes } from "@/router";
import { useCountryStore } from "@/stores/countryStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";
import { computed, ref, watch } from "vue";
import { useWineListStore } from "@/stores/wineListStore.ts";
import { useRoute, useRouter } from "vue-router";
import {
  getCategoryLabelByValue,
  getColourLabelByValue,
  getSugarTypeLabelByValue,
  type WineListItem,
} from "w-list-api";
import { WinePriceBottle, WinePriceGlass } from "w-list-components";
import { vintage } from "w-list-utils";
import AppTopbar from "@/components/AppTopbar.vue";
import { storeToRefs } from "pinia";
const { getRegionNameById } = useRegionStore();
const { getCountryNameById } = useCountryStore();
const { activeWineListBottle, activeWineListGlass } =
  storeToRefs(useWineListStore());

const glassItemsName = "По бокалам";
const categoryName = "По бутылкам";
const countryName = "Страны";
const grapesName = "Виноград";
const regionName = "Регионы";
const sugarTypename = "Тип сахара";
const colourName = "Цвет";

const namingFunctions = {
  "По бокалам": getCategoryLabelByValue,
  "По бутылкам": getCategoryLabelByValue,
  Страны: (key: any) => getCountryNameById(+key),
  Виноград: (key: any) => key,
  Регионы: (key: any) => getRegionNameById(+key),
  "Тип сахара": getSugarTypeLabelByValue,
  Цвет: getColourLabelByValue,
};

const tabContent = computed(() => [
  { title: glassItemsName, items: activeWineListGlass.value?.categories },
  { title: categoryName, items: activeWineListBottle.value?.categories },
  { title: countryName, items: activeWineListBottle.value?.countries },
  { title: grapesName, items: activeWineListBottle.value?.grapes },
  { title: regionName, items: activeWineListBottle.value?.regions },
  { title: sugarTypename, items: activeWineListBottle.value?.sugarTypes },
  { title: colourName, items: activeWineListBottle.value?.colours },
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

const activeAccordion = ref<number | string[]>([]);
const activeTab = ref(0);
const router = useRouter();
const route = useRoute();

const updateActiveAccordion = () => {
  const selectedTab = tabContent.value[activeTab.value];
  activeAccordion.value = Object.keys(selectedTab?.items || {});
};

watch(activeTab, () => {
  updateActiveAccordion(); // Update the accordion
  router.push({ name: AppRoutes.TABS, query: { activeTab: activeTab.value } }); // Navigate
});

const initActiveTab = () => {
  const routeTab = Number(route.query.activeTab);
  activeTab.value = !isNaN(routeTab) ? routeTab : 0; // Use the route value or default to 0
};

initActiveTab();
updateActiveAccordion();
</script>

<style>
.customBlock {
  .p-accordionheader {
    justify-content: start !important;
    gap: 24px !important;
  }
  .p-accordioncontent-content {
    padding: 0 !important;
  }

  .p-datatable-header-cell {
    padding: 0 !important;
  }
}
</style>
