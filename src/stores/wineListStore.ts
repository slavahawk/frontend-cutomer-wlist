import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { type WineListActive, WineListService } from "w-list-api";
import { useToast } from "primevue/usetoast";
import { handleError } from "@/utils/handleError.ts"; // Путь к сервису управления списками вин

export const useWineListStore = defineStore("wineList", () => {
  const activeWineList = ref<WineListActive | null>(null);
  const loading = ref(false);
  const toast = useToast();

  const getActiveList = async (shopId: number) => {
    loading.value = true;

    try {
      const data = await WineListService.getActiveList(shopId);
      activeWineList.value = data;
      return data;
    } catch (err) {
      handleError(err, toast);
    } finally {
      loading.value = false;
    }
  };

  const isSelectedWineList = computed(() => !!activeWineList.value);

  return {
    loading,
    isSelectedWineList,
    getActiveList,
    activeWineList,
  };
});
