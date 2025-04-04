import { defineStore } from "pinia";
import { ref } from "vue";
import { useCountryStore } from "@/stores/countryStore.ts";
import { useGrapeStore } from "@/stores/grapeStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";
import { useWineListStore } from "@/stores/wineListStore.ts";
import { handleError } from "@/utils/handleError.ts";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";
import { useActiveInfo } from "@/stores/activeInfo.ts";

export const useAppInitStore = defineStore("appInit", () => {
  const isLoad = ref(true);
  const route = useRoute();
  const toast = useToast();
  const { fetchCountries } = useCountryStore();
  const { fetchGrapes } = useGrapeStore();
  const { fetchRegions } = useRegionStore();
  const { getActiveInfo } = useActiveInfo();
  const { getActiveListBottle, getActiveListGlass } = useWineListStore();

  const fetchData = async (id: number) => {
    return Promise.all([
      getActiveInfo(id),
      getActiveListGlass(id),
      getActiveListBottle(id),
      fetchRegions(),
      fetchGrapes(),
      fetchCountries(),
    ]);
  };

  const initApp = async () => {
    // isLoad.value = true;
    try {
      const [info] = await fetchData(+route.params.id);

      if (!info) {
        window.location.replace("https://w-list.ru/");
        return;
      }
    } catch (err) {
      handleError(err, toast);
    } finally {
      isLoad.value = false;
    }
  };

  return { isLoad, initApp };
});
