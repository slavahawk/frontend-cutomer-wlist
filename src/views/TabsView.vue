<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCountryStore } from "@/stores/countryStore.ts";
import { useGrapeStore } from "@/stores/grapeStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";
import { categoryOptions, colourOptions, sugarTypesOptions } from "w-list-api";
import { computed, reactive } from "vue";
import { useWineListItemStore } from "@/stores/wineListItemStore.ts";

const { countries } = storeToRefs(useCountryStore());
const { grapes } = storeToRefs(useGrapeStore());
const { regions } = storeToRefs(useRegionStore());
const { fetchWineListItems } = useWineListItemStore();

const tabContent = computed(() => [
  { title: "Категории", items: categoryOptions },
  { title: "Страны", items: countries.value },
  { title: "Виноград", items: grapes.value },
  { title: "Регионы", items: regions.value },
  { title: "Тип сахара", items: sugarTypesOptions },
  { title: "Цвет", items: colourOptions },
  // { title: "Объем", items: bottleVolumeOptions },
]);

const params = reactive({
  page: 0,
  size: 10,
  category: undefined,
  colour: undefined,
  sugarType: undefined,
  countryId: undefined,
  regionId: undefined,
  grapeId: undefined,
  vintage: undefined,
  bottleVolume: undefined,
});

const clickCard = (item: any, title: any) => {
  if (title === "Категории") {
    params.category = item.value;
  }

  fetchWineListItems(5, params);
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
          <div
            class="mb-12"
            v-for="item in tab.items"
            :key="item?.id || item?.value"
          >
            <DataTable
              :value="[
                { id: 0, name: 'suck', date: 2022, price: 3200 },
                { id: 1, name: 'хуяк', date: 2022, price: 3500 },
                { id: 2, name: 'пиздяк', date: 2022, price: 2400 },
              ]"
              tableStyle="min-width: 50rem"
              stripedRows
            >
              <template #header>
                <div
                  class="text-2xl font-semibold"
                  style="color: var(--primary-color)"
                >
                  {{ item?.name || item?.label }}
                </div>
              </template>
              <Column field="date" class="w-14"> </Column>
              <Column field="name">
                <template #body="{ data }">
                  {{ data.name }}
                  <div>Из ебаной испании</div>
                </template>
              </Column>
              <Column class="w-12" field="price" sortable></Column>
            </DataTable>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <!--    <div v-if="wineListItems?.page.totalElements">-->
    <!--      <SliderComponent>-->
    <!--        <swiper-slide-->
    <!--          v-for="w in wineListItems?._embedded.rootWineListItemResponseList"-->
    <!--          :key="w.id"-->
    <!--        >-->
    <!--          <CardWine :wine="w.wine" />-->
    <!--        </swiper-slide>-->
    <!--      </SliderComponent>-->
    <!--    </div>-->
  </div>
</template>

<style scoped lang="scss">
.square {
  width: 100%; // или 100px или другая фиксированная ширина в зависимости от вашего дизайна
  aspect-ratio: 1;
  /* или например если нужно абсолютное значение
     height: calc(100% / 3); // Пример для 3 элементов в ряд, вам может нужно это менять в зависимости от ваших требований */
}
</style>
