import { defineStore } from "pinia";
import { ref } from "vue";
import { useCountryStore } from "@/stores/countryStore.ts";
import { useGrapeStore } from "@/stores/grapeStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";
import { useWineListStore } from "@/stores/wineListStore.ts";
import { useAuthStore } from "@/stores/authStore.ts";
import { handleError } from "@/utils/handleError.ts";
import { useToast } from "primevue/usetoast";

export const useAppInitStore = defineStore("appInit", () => {
  const isLoad = ref(true);

  const toast = useToast();
  const { fetchCountries } = useCountryStore();
  const { fetchGrapes } = useGrapeStore();
  const { fetchRegions } = useRegionStore();
  const { getActiveList } = useWineListStore();
  const { getMe } = useAuthStore();

  const initApp = async () => {
    try {
      isLoad.value = true;

      await getMe(); // Ждем получения данных о пользователе

      // Ждем завершения всех запросов
      await Promise.allSettled([
        fetchRegions(),
        fetchGrapes(),
        fetchCountries(),
        getActiveList(),
      ]);
    } catch (err) {
      handleError(err, toast);
    } finally {
      isLoad.value = false;
    }
  };

  return { isLoad, initApp };
});
