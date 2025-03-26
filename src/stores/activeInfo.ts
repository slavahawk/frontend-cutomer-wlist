import { ref } from "vue";
import { defineStore } from "pinia";
import { ActiveWineListService } from "w-list-api";
import { type ActiveListInfo } from "wlist-types";
import { useToast } from "primevue/usetoast";
import { handleError } from "@/utils/handleError.ts"; // Путь к сервису управления списками вин
import { checkData } from "w-list-utils";

export const useActiveInfo = defineStore("info", () => {
  const info = ref<ActiveListInfo | null>(null);
  const loading = ref(false);
  const toast = useToast();

  const getActiveInfo = async (shopId: number) => {
    loading.value = true;

    try {
      const data = await ActiveWineListService.getActiveListInfo(shopId);
      checkData(data);
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
