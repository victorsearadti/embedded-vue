import { useQuery } from "@tanstack/vue-query";
import { refDebounced } from "@vueuse/core";
import { computed, ref } from "vue";
import { LocationResult, geocodingApi } from "../api/geocoding.api";
import { queryKeys } from "../plugins/vueQuery";

const getCountryFlag = (countryCode: string) =>
  `https://hatscripts.github.io/circle-flags/flags/${countryCode.toLowerCase()}.svg`;

type QueryDataResult = LocationResult & {
  title: string;
  subtitle: string;
  avatar: string;
  value: string;
};

export function useSearchLocation() {
  const searchValue = ref("");
  const searchValueDebounced = refDebounced(searchValue, 1000);
  const previousResult = ref<QueryDataResult[]>([]);

  async function searchLocation(name: string) {
    if (!name) {
      return previousResult.value;
    }

    const response = await geocodingApi.getLocationByName(name);
    const parsedResponse: QueryDataResult[] = response.results.map((item) => ({
      ...item,
      title: item.name,
      subtitle: `${item.admin2}, ${item.admin1} - ${item.country}`,
      avatar: getCountryFlag(item.country_code),
      value: `${item.id}-${item.name}`,
    }));

    previousResult.value = parsedResponse;

    return parsedResponse;
  }

  const searchKey = computed(() => searchValueDebounced.value.toLowerCase());
  const searchLocationQuery = useQuery({
    queryKey: [queryKeys.searchLocation, { searchKey }],
    queryFn: () => searchLocation(searchValueDebounced.value),
  });

  return { searchValue, searchLocationQuery };
}
