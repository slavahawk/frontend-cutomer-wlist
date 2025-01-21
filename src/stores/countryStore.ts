import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { CountryService, type Country } from "w-list-api";

export const useCountryStore = defineStore("country", () => {
  const countries = ref<Country[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const countriesOptions = computed(() => {
    return countries.value.map((country) => ({
      value: country.id,
      label: country.name,
    }));
  });

  const getCountryNameById = (countryId: number): string | null =>
      countries.value.find((c: Country) => c.id === countryId)?.name ?? null;

  const fetchCountries = async () => {
    loading.value = true;
    error.value = null;

    try {
      countries.value = await CountryService.getAll();
    } catch (err) {
      error.value = "Ошибка при получении стран. Попробуйте еще раз.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };


  return {
    countries,
    loading,
    error,
    fetchCountries,
    countriesOptions,
    getCountryNameById,
  };
});
