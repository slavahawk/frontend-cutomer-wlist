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
      console.log("Initializing app...");
      isLoad.value = true;

      const data = await getActiveList(+route.params.id);
      console.log("Fetched active list:", data);

      if (!data) {
        console.error("No active data found, redirecting.");
        return window.location.replace("https://w-list.ru/");
      }

      await Promise.allSettled([
        fetchRegions(),
        fetchGrapes(),
        fetchCountries(),
      ]).then((results) => {
        console.log("Fetch results:", results); // Log results for debugging
      });
    } catch (err) {
      console.error("Error during app initialization:", err);
      handleError(err, toast);
    } finally {
      isLoad.value = false;
      console.log("App initialization complete.");
    }
  };

  return { isLoad, initApp };
});
