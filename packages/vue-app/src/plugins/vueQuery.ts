import { VueQueryPlugin } from "@tanstack/vue-query";

const vueQuery = VueQueryPlugin;

const queryKeys = {
  searchLocation: "SEARCH_LOCATION",
  locationCurrentWeather: "LOCATION_CURRENT_WEATHER",
} as const;

export { queryKeys, vueQuery };
