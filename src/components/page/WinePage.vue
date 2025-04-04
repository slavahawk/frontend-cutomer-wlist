<template>
  <div class="layout-wrapper">
    <AppTopbar></AppTopbar>
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
              <TabPanel v-if="activeTabData" :value="activeTabData.value">
                <Accordion v-model:value="activeAccordion" multiple>
                  <AccordionPanel
                    v-for="(item, key) in activeTabData.items"
                    :key="key"
                    :value="key"
                  >
                    <AccordionHeader>
                      <div class="text-2xl font-semibold flex gap-2">
                        <span style="color: var(--primary-color)">
                          {{ getNamingKey(key, activeTabData.title) }}
                        </span>
                      </div>
                    </AccordionHeader>
                    <AccordionContent>
                      <WineDataTable
                        v-if="activeAccordion.includes(key)"
                        :data="item.data"
                        :isGlass="activeTabData.title === glassItemsName"
                        @showWineDetails="
                          (id) => showWineDetails(id, item.data)
                        "
                      />
                    </AccordionContent>
                  </AccordionPanel>
                </Accordion>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <WineDetailsDialog
            v-if="selectedWines"
            v-model:show="showDetails"
            :selectedWines="selectedWines"
            :selectWineId="selectWineId"
          />
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
} from "w-list-api";
import { type WineListItem } from "wlist-types";

import { storeToRefs } from "pinia";
import { useGrapeStore } from "@/stores/grapeStore.ts";
import WineDataTable from "@/components/WineDataTable.vue";
import AppTopbar from "@/components/AppTopbar.vue";
import { useActiveInfo } from "@/stores/activeInfo.ts";

const { getCountryNameById } = useCountryStore();
const { getRegionNameById } = useRegionStore();
const { getGrapeNameById } = useGrapeStore();
const { info } = storeToRefs(useActiveInfo());
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
  [glassItemsName]: getCategoryLabelByValue,
  [categoryName]: getCategoryLabelByValue,
  [countryName]: (key: any) => getCountryNameById(+key),
  [grapesName]: (key: any) => getGrapeNameById(+key),
  [regionName]: (key: any) => getRegionNameById(+key),
  [sugarTypename]: getSugarTypeLabelByValue,
  [colourName]: getColourLabelByValue,
};

const tabContent = computed(() => [
  {
    title: glassItemsName,
    items: activeWineListGlass.value?.categories,
    value: 0,
  },
  {
    title: categoryName,
    items: activeWineListBottle.value?.categories,
    value: 1,
  },
  {
    title: countryName,
    items: activeWineListBottle.value?.countries,
    value: 2,
  },
  { title: grapesName, items: activeWineListBottle.value?.grapes, value: 3 },
  { title: regionName, items: activeWineListBottle.value?.regions, value: 4 },
  {
    title: sugarTypename,
    items: activeWineListBottle.value?.sugarTypes,
    value: 5,
  },
  { title: colourName, items: activeWineListBottle.value?.colours, value: 6 },
]);

const activeTabData = computed(() => tabContent.value[activeTab.value]);

const getNamingKey = (key: number, title: string) => {
  const namingFunction = namingFunctions[title];
  return namingFunction ? namingFunction(key) : key;
};

const showDetails = ref(false);
const selectWineId = ref<number | null>(null);
const selectedWines = ref<WineListItem[] | null>(null);

const showWineDetails = (id: number, item: WineListItem[]) => {
  selectWineId.value = id;
  selectedWines.value = item;
  showDetails.value = true;
};

const activeAccordion = ref<number | string[]>([]);
const activeTab = ref(0);
const router = useRouter();
const route = useRoute();

const updateActiveAccordion = () => {
  activeAccordion.value = [];
  const selectedTab = tabContent.value[activeTab.value];
  if (
    activeTabData.value.title === glassItemsName ||
    (info.value && info.value.itemCount < 50)
  ) {
    activeAccordion.value = Object.keys(selectedTab?.items || {});
  }
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
