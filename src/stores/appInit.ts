import { defineStore } from "pinia";
import { ref } from "vue";
import { useCountryStore } from "@/stores/countryStore.ts";
import { useGrapeStore } from "@/stores/grapeStore.ts";
import { useRegionStore } from "@/stores/regionStore.ts";
import { useWineListStore } from "@/stores/wineListStore.ts";
import { useAuthStore } from "@/stores/authStore.ts";

export const useAppInitStore = defineStore("appInit", () => {
  const isLoad = ref(true);

  const { fetchCountries } = useCountryStore();
  const { fetchGrapes } = useGrapeStore();
  const { fetchRegions } = useRegionStore();
  const { getActiveList } = useWineListStore();
  const { getMe } = useAuthStore();

  const initApp = () => {
    Promise.allSettled([
      getMe(),
      fetchRegions(),
      fetchGrapes(),
      fetchCountries(),
      getActiveList(),
    ]).finally(() => (isLoad.value = false));
  };

  return { isLoad, initApp };
});
