import { useQuery } from "@tanstack/vue-query";
import { ComputedRef, Ref } from "vue";
import { weatherApi } from "../api/weather.api";
import { queryKeys } from "../plugins/vueQuery";

type Coordinates = {
  lat?: string;
  long?: string;
};

type UseLocaleCurrentWeatherArgs = {
  coordinates: Ref<Coordinates> | ComputedRef<Coordinates>;
  enabled: boolean;
};

export function useLocaleCurrentWeather({
  coordinates,
  enabled = false,
}: UseLocaleCurrentWeatherArgs) {
  const getCurrentWeather = async (lat?: string, long?: string) => {
    if (!lat || !long) {
      return null;
    }

    const response = await weatherApi.getCurrentWeatherForLocation({
      latitude: lat,
      longitude: long,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    return response;
  };

  const localeCurrentWeatherQuery = useQuery({
    queryKey: [queryKeys.locationCurrentWeather, { coordinates }],
    queryFn: () =>
      getCurrentWeather(coordinates.value.lat, coordinates.value.long),
    enabled,
  });

  return { localeCurrentWeatherQuery };
}
