// src/stores/wineListItemStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import {
  type CreateWineList,
  type WineListItemResponses,
  type WineListItemRequest,
  WineListItemService,
} from "w-list-api";
import { useToast } from "primevue/usetoast";
import { handleError } from "@/utils/handleError.ts";

export const useWineListItemStore = defineStore("wineListItems", () => {
  const wineListItems = ref<WineListItemResponses>();
  const loading = ref(false);
  const toast = useToast();

  // Utility function to set loading state
  const setLoading = (state: boolean) => {
    loading.value = state;
  };

  // Fetch all wine list items
  const fetchWineListItems = async (
    listId: number,
    params: WineListItemRequest,
  ) => {
    setLoading(true);
    try {
      wineListItems.value = await WineListItemService.getAll(listId, params);
    } catch (error) {
      handleError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a wine list item by ID
  const fetchWineListItemById = async (listId: number, id: number) => {
    setLoading(true);
    try {
      return await WineListItemService.getById(listId, id);
    } catch (error) {
      handleError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  // Create a new wine list item
  const createWineListItem = async (wineListItem: CreateWineList) => {
    setLoading(true);
    try {
      const data = await WineListItemService.create(wineListItem);
      if (data) {
        addWineListItem(data);
        return data;
      }
    } catch (error) {
      handleError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  // Add new item to the state
  const addWineListItem = (item: any) => {
    wineListItems.value.page.totalElements++;
    wineListItems.value._embedded.rootWineListItemResponseList.unshift(item);
  };

  // Update an existing wine list item
  const updateWineListItem = async ({ listId, itemId, prices }: any) => {
    setLoading(true);
    try {
      const data = await WineListItemService.update(listId, itemId, prices);
      if (data) {
        const findIndex =
          wineListItems.value._embedded.rootWineListItemResponseList.findIndex(
            (w) => w.id === itemId,
          );
        if (findIndex > -1) {
          wineListItems.value._embedded.rootWineListItemResponseList.splice(
            findIndex,
            1,
            data,
          );
        }
        return data;
      }
    } catch (error) {
      handleError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  // Delete a wine list item
  const deleteWineListItem = async (listId: number, itemId: number) => {
    setLoading(true);
    try {
      await WineListItemService.delete(listId, itemId);
      removeWineListItem(itemId);
    } catch (error) {
      handleError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  // Remove item from the state
  const removeWineListItem = (itemId: number) => {
    const findIndex =
      wineListItems.value._embedded.rootWineListItemResponseList.findIndex(
        (w) => w.id === itemId,
      );

    if (findIndex > -1) {
      wineListItems.value.page.totalElements--;
      wineListItems.value._embedded.rootWineListItemResponseList.splice(
        findIndex,
        1,
      );
    }
  };

  return {
    wineListItems,
    loading,
    fetchWineListItems,
    fetchWineListItemById,
    createWineListItem,
    deleteWineListItem,
    updateWineListItem,
  };
});
