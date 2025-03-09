import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { type WineListActive, ActiveWineListService } from "w-list-api";
import { useToast } from "primevue/usetoast";
import { handleError } from "@/utils/handleError.ts"; // Путь к сервису управления списками вин

export const useWineListStore = defineStore("wineList", () => {
  const activeWineListBottle = ref<WineListActive | null>(null);
  const activeWineListGlass = ref<WineListActive | null>(null);
  const loading = ref(false);
  const toast = useToast();

  const getActiveListBottle = async (shopId: number) => {
    loading.value = true;

    try {
      const data = await ActiveWineListService.getActiveListBottle(shopId);
      activeWineListBottle.value = data;
      return data;
    } catch (err) {
      handleError(err, toast);
    } finally {
      loading.value = false;
    }
  };

  const getActiveListGlass = async (shopId: number) => {
    loading.value = true;

    try {
      const data = await ActiveWineListService.getActiveListGlass(shopId);
      if (data) {
        activeWineListGlass.value = data;
        return data;
      }
    } catch (err) {
      handleError(err, toast);
    } finally {
      loading.value = false;
    }
  };

  const isSelectedWineList = computed(() => !!activeWineListBottle.value);

  return {
    loading,
    isSelectedWineList,
    getActiveListBottle,
    getActiveListGlass,
    activeWineListBottle,
    activeWineListGlass,
  };
});
