import { computed, ref } from "vue";
import { defineStore } from "pinia";
import {
  type CreateWineList,
  type WineList,
  type WineListActive,
  WineListService,
} from "w-list-api";
import { useToast } from "primevue/usetoast";
import { handleError } from "@/utils/handleError.ts"; // Путь к сервису управления списками вин

export const useWineListStore = defineStore("wineList", () => {
  const wineLists = ref<WineList[]>([]);
  const wineList = ref<WineList | null>(null);
  const activeWineList = ref<WineListActive | null>(null);
  const loading = ref(false);
  const toast = useToast();

  const getActiveList = async () => {
    loading.value = true;

    try {
      const data = await WineListService.getActiveList();
      activeWineList.value = data;
      return data;
    } catch (err) {
      handleError(err, toast);
    } finally {
      loading.value = false;
    }
  };

  // Функция для получения всех списков вин
  const fetchWineLists = async () => {
    loading.value = true;

    try {
      wineLists.value = await WineListService.getAll();
    } catch (err) {
      handleError(err, toast);
    } finally {
      loading.value = false;
    }
  };

  // Функция для получения списка вин по ID
  const fetchWineListById = async (id: number) => {
    loading.value = true;

    try {
      wineList.value = await WineListService.getById(id);
    } catch (err) {
      handleError(err, toast);
    } finally {
      loading.value = false;
    }
  };

  // Функция для обновления списка вин
  const updateWineList = async (id: number, wineListData: CreateWineList) => {
    loading.value = true;

    try {
      const updatedWineList = await WineListService.update(id, wineListData);
      const index = wineLists.value.findIndex((list) => list.id === id);
      if (index !== -1) {
        wineLists.value[index] = updatedWineList;
      }
    } catch (err) {
      handleError(err, toast);
    } finally {
      loading.value = false;
    }
  };

  // Функция для удаления списка вин
  const deleteWineList = async (id: number) => {
    loading.value = true;

    try {
      await WineListService.delete(id);
      wineLists.value = wineLists.value.filter((list) => list.id !== id);
    } catch (err) {
      handleError(err, toast);
    } finally {
      loading.value = false;
    }
  };

  // Функция для создания нового списка вин
  const createWineList = async (wineListData: Request) => {
    loading.value = true;

    try {
      const newWineList = await WineListService.create(wineListData);
      wineLists.value.push(newWineList);
      return newWineList;
    } catch (err) {
      handleError(err, toast);
    } finally {
      loading.value = false;
    }
  };

  // Функция для очистки выбранного списка вин
  const clearSelectedWineList = () => {
    wineList.value = null;
  };

  const isSelectedWineList = computed(() => !!activeWineList.value);

  return {
    wineLists,
    wineList,
    loading,
    fetchWineLists,
    fetchWineListById,
    updateWineList,
    deleteWineList,
    createWineList,
    clearSelectedWineList,
    isSelectedWineList,
    getActiveList,
    activeWineList,
  };
});
