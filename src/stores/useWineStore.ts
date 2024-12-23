import {defineStore} from "pinia";
import {ref} from "vue";
import {useToast} from "primevue/usetoast";
import {handleError} from "@/helper/handleError";
import {checkData} from "@/helper/checkData";
import type {Wine} from "@/types/wine";
import {WineService} from "@/service/WineService";

export const useWineStore = defineStore("wines", () => {
  const wines = ref<Wine[]>([]);
  const isLoad = ref(false);
  const toast = useToast();

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
  };
});
