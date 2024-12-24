import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { handleError } from "@/helper/handleError";
import { checkData } from "@/helper/checkData";
import type { Wine } from "@/types/wine";
import { WineService } from "@/service/WineService";
import {
  addWinesToDb,
  getWinesFromDb,
  deleteAllWinesFromDb,
  getDatabaseSize,
} from "@/db";

export const useWineStore = defineStore("wines", () => {
  const wines = ref<Wine[]>([]);
  const isLoad = ref(false);
  const toast = useToast();

  const loadData = async () => {
    const data = await getWinesFromDb();
    console.log(data);
    if (data) {
      wines.value = data;

      const size = await getDatabaseSize();
      let sizeInMB = size / (1024 * 1024); // перевод в МБ
      console.log("sizeDB: ", sizeInMB.toFixed(2) + " МБ"); // вывод с 2 знаками после запятой
    }
  };
  const clearData = () => {
    wines.value = [];
    deleteAllWinesFromDb();
  };

  loadData();

  const getWines = async () => {
    isLoad.value = true;
    try {
      const data = await WineService.getAllWines();

      checkData(data);

      toast.add({
        severity: "success",
        summary: "Вина получены",
        life: 3000,
      });
      wines.value = data;
      await addWinesToDb(data);
      return data;
    } catch (error) {
      handleError(error, toast);
    } finally {
      isLoad.value = false;
    }
  };

  return {
    wines,
    isLoad,
    getWines,
    clearData,
  };
});
