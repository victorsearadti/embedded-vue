import { VueQueryPlugin } from "@tanstack/vue-query";

const vueQuery = VueQueryPlugin;

const queryKeys = {
  searchLocation: "SEARCH_LOCATION",
} as const;

export { queryKeys, vueQuery };
