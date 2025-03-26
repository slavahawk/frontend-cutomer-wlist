import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { RegionService } from "w-list-api";
import { type Region } from "wlist-types";
import { handleError } from "@/utils/handleError.ts";
import { useToast } from "primevue/usetoast";

export const useRegionStore = defineStore("region", () => {
  const regions = ref<Region[]>([]);
  const loading = ref(false);
  const toast = useToast();

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

    try {
      regions.value = await RegionService.getAll();
    } catch (err) {
      handleError(err, toast);
    } finally {
      loading.value = false;
    }
  };

  return {
    regions,
    regionOptions,
    loading,
    fetchRegions,
    getRegionNameById,
  };
});
