// src/stores/grapeStore.ts
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { GrapeService } from "w-list-api";
import { type Grape, type GrapeData } from "wlist-types";
import { handleError } from "@/utils/handleError.ts";
import { useToast } from "primevue/usetoast";

export const useGrapeStore = defineStore("grape", () => {
  const grapes = ref<Grape[]>([]);
  const selectedGrape = ref<Grape | null>(null);
  const loading = ref(false);
  const toast = useToast();

  const grapeOptions = computed(() => {
    return grapes.value.map((grape) => ({
      value: grape.id,
      label: grape.name,
    }));
  });

  const getGrapesNameById = (grapeData: GrapeData[]): string[] => {
    return grapeData
      .map(
        (grapeD) =>
          grapes.value.find((g: Grape) => g.id === grapeD.grapeId)?.name ??
          null,
      )
      .filter((name) => name !== null);
  };

  const getGrapeNameById = (grapeId: number): string => {
    const grape = grapes.value.find((g: Grape) => g.id === grapeId);
    return grape?.name || "";
  };

  const fetchGrapes = async () => {
    loading.value = true;

    try {
      grapes.value = await GrapeService.getAll();
    } catch (err) {
      handleError(err, toast);
    } finally {
      loading.value = false;
    }
  };

  const clearSelectedGrape = () => {
    selectedGrape.value = null;
  };

  return {
    grapes,
    grapeOptions,
    selectedGrape,
    loading,
    fetchGrapes,
    clearSelectedGrape,
    getGrapesNameById,
    getGrapeNameById,
  };
});
