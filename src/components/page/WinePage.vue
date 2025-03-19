<template>
  <div class="layout-wrapper">
    <AppTopbar />
    <div class="layout-main-container">
      <div class="layout-main">
        <div class="card customBlock !p-0">
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
                <CustomAccordion>
                  <CustomAccordionItem
                    v-for="(item, key) in tab.items"
                    :key="key"
                  >
                    <template #header>
                      <div class="text-2xl font-semibold flex gap-2">
                        <span style="color: var(--primary-color)">
                          {{ getNamingKey(key, tab) }}
                        </span>
                      </div>
                    </template>
                    <template #content>
                      <WineDataTable
                        v-if="item.items"
                        :title="tab.title"
                        :items="item.items"
                        @item-click="showWineDetails"
                      />
                    </template>
                  </CustomAccordionItem>
                </CustomAccordion>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>

    <WineDetailsDialog
      v-if="selectedWines && showDetails"
      v-model:show="showDetails"
      :selectedWines="selectedWines"
      :selectWineId="selectWineId"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AppRoutes } from "@/router";
import { useCountryStore } from "@/stores/countryStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";
import { useWineListStore } from "@/stores/wineListStore.ts";
import CustomAccordion from "@/components/CustomAccordion.vue";
import CustomAccordionItem from "@/components/CustomAccordionItem.vue";
import WineDataTable from "@/components/WineDataTable.vue";
import WineDetailsDialog from "@/components/WineDetailsDialog.vue";
import {
  getCategoryLabelByValue,
  getColourLabelByValue,
  getSugarTypeLabelByValue,
} from "w-list-api";
import AppTopbar from "@/components/AppTopbar.vue"; // Новый компонент

// Store
const { getCountryNameById } = useCountryStore();
const { getRegionNameById } = useRegionStore();
const { activeWineListBottle, activeWineListGlass } = useWineListStore();

// State
const activeTab = ref(0);
const showDetails = ref(false);
const selectWineId = ref<number | null>(null);
const selectedWines = ref(null);

// Tab content
const glassItemsName = "По бокалам";
const categoryName = "По бутылкам";
const countryName = "Страны";
const grapesName = "Виноград";
const regionName = "Регионы";
const sugarTypename = "Тип сахара";
const colourName = "Цвет";

const tabContent = computed(() => [
  { title: glassItemsName, items: activeWineListGlass.categories },
  { title: categoryName, items: activeWineListBottle.categories },
  { title: countryName, items: activeWineListBottle?.countries },
  { title: grapesName, items: activeWineListBottle?.grapes },
  { title: regionName, items: activeWineListBottle?.regions },
  { title: sugarTypename, items: activeWineListBottle?.sugarTypes },
  { title: colourName, items: activeWineListBottle?.colours },
]);

const getNamingKey = (key: any, item: any) => {
  const namingFunctions = {
    "По бокалам": getCategoryLabelByValue,
    "По бутылкам": getCategoryLabelByValue,
    Страны: () => getCountryNameById(+key),
    Регионы: () => getRegionNameById(+key),
    Виноград: () => key,
    "Тип сахара": getSugarTypeLabelByValue,
    Цвет: getColourLabelByValue,
  };

  const namingFunction = namingFunctions[item.title];
  return namingFunction ? namingFunction(key) : key.toString(); // Приводим к строке для удобства
};

// Метод для показа деталей вина
const showWineDetails = ({ allWines, selectWine }) => {
  selectWineId.value = selectWine.id;
  selectedWines.value = allWines; // Используйте корректные данные
  showDetails.value = true;
};

// Router
const router = useRouter();
const route = useRoute();

watch(activeTab, () => {
  router.push({ name: AppRoutes.TABS, query: { activeTab: activeTab.value } });
});

const initActiveTab = () => {
  const routeTab = Number(route.query.activeTab);
  activeTab.value = !isNaN(routeTab) ? routeTab : 0; // Если значение корректно, используем его, иначе 0
};

initActiveTab();
</script>

<style scoped>
.customBlock {
  .p-datatable-header-cell {
    padding: 0; /* Избегайте использования !important, если возможно */
  }
}
</style>
