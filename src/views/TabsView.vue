<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCountryStore } from "@/stores/countryStore.ts";
import { useGrapeStore } from "@/stores/grapeStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";
import CardTab from "@/components/CardTab.vue";
import {
  bottleVolumeOptions,
  categoryOptions,
  colourOptions,
  sugarTypesOptions,
} from "w-list-api";
import { computed } from "vue";

const { countries } = storeToRefs(useCountryStore());
const { grapes } = storeToRefs(useGrapeStore());
const { regions } = storeToRefs(useRegionStore());
// const { fetchWineListItems } = storeToRefs(useWineListItemStore());

const tabContent = computed(() => [
  { title: "Категории", items: categoryOptions },
  { title: "Страны", items: countries.value },
  { title: "Виноград", items: grapes.value },
  { title: "Регионы", items: regions.value },
  { title: "Тип сахара", items: sugarTypesOptions },
  { title: "Цвет", items: colourOptions },
  { title: "Объем", items: bottleVolumeOptions },
]);

const clickCard = (item: any, title: any) => {
  console.log(item, title);

  // fetchWineListItems({})
};
</script>

<template>
  <div class="card">
    <Tabs :value="0">
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
          class="grid grid-cols-4 gap-2"
        >
          <CardTab
            v-for="item in tab.items"
            :key="item?.id || item?.value"
            :name="item?.name || item?.label"
            @click="clickCard(item, tab.title)"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<style scoped lang="scss"></style>
