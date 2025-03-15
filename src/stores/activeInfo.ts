import { ref } from "vue";
import { defineStore } from "pinia";
import { type ActiveListInfo, ActiveWineListService } from "w-list-api";
import { useToast } from "primevue/usetoast";
import { handleError } from "@/utils/handleError.ts"; // Путь к сервису управления списками вин

export const useActiveInfo = defineStore("info", () => {
  const info = ref<ActiveListInfo | null>(null);
  const loading = ref(false);
  const toast = useToast();

  const getActiveInfo = async (shopId: number) => {
    loading.value = true;

    try {
      const data = await ActiveWineListService.getActiveListInfo(shopId);
      info.value = data;
      return data;
    } catch (err) {
      handleError(err, toast);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    info,
    getActiveInfo,
  };
});
