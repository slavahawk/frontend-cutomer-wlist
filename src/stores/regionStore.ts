import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { RegionService, type Region } from "w-list-api";

export const useRegionStore = defineStore("region", () => {
  const regions = ref<Region[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const regionOptions = computed(() => {
    return regions.value.map((region) => ({
      value: region.id,
      label: region.name,
    }));
  });


  const getRegionNameById = (regionId: number): string | null =>
      regions.value.find((c: Region) => c.id === regionId)?.name ?? null;

  const fetchRegions = async () => {
    loading.value = true;
    error.value = null;

    try {
      regions.value = await RegionService.getAll();
    } catch (err) {
      error.value = "Ошибка при получении регионов. Попробуйте еще раз.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };



  return {
    regions,
    regionOptions,
    loading,
    error,
    fetchRegions,
    getRegionNameById
  };
});
