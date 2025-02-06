import { defineStore } from "pinia";
import { ref } from "vue";
import { useCountryStore } from "@/stores/countryStore.ts";
import { useGrapeStore } from "@/stores/grapeStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";
import { useWineListStore } from "@/stores/wineListStore.ts";
import { handleError } from "@/utils/handleError.ts";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";

export const useAppInitStore = defineStore("appInit", () => {
  const isLoad = ref(true);
  const route = useRoute();
  const toast = useToast();
  const { fetchCountries } = useCountryStore();
  const { fetchGrapes } = useGrapeStore();
  const { fetchRegions } = useRegionStore();
  const { getActiveList } = useWineListStore();

  const initApp = async () => {
    try {
      const data = await getActiveList(+route.params.id);

      if (!data) {
        window.location.replace("https://w-list.ru/");
      }

      const results = Promise.all([
        fetchRegions(),
        fetchGrapes(),
        fetchCountries(),
      ]);

      await results;
    } catch (err) {
      handleError(err, toast);
    } finally {
      isLoad.value = false;
    }
  };

  return { isLoad, initApp };
});
