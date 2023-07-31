<script setup lang="ts">
import { mdiSearchWeb } from "@mdi/js";
import { computed, ref, watch } from "vue";
import WeatherCard, { WeatherCardProps } from "../components/WeatherCard.vue";
import { useLocaleCurrentWeather } from "../composables/useLocaleCurrentWeather";
import {
  UseSearchLocationData,
  useSearchLocation,
} from "../composables/useSearchLocation";

const selected = ref<UseSearchLocationData | null>(null);
const { searchValue, searchLocationQuery, searchResultHistory } =
  useSearchLocation();
const lastViewedCard = ref<WeatherCardProps | null>(null);

const coordinates = computed(() => {
  return {
    lat: selected.value?.latitude.toString(),
    long: selected.value?.longitude.toString(),
  };
});

const { localeCurrentWeatherQuery } = useLocaleCurrentWeather({
  coordinates,
  enabled: Boolean(selected),
});

const isLoading = computed(
  () =>
    searchLocationQuery.isLoading.value ||
    searchLocationQuery.isFetching.value ||
    searchLocationQuery.isPending.value ||
    localeCurrentWeatherQuery.isLoading.value ||
    localeCurrentWeatherQuery.isFetching.value ||
    localeCurrentWeatherQuery.isPending.value
);

const stringOrEmpty = (value = "") => value;

const weatherInfo = computed(() => {
  const temperature = stringOrEmpty(
    localeCurrentWeatherQuery.data.value?.current_weather.temperature.toString()
  );

  const windSpeed = stringOrEmpty(
    localeCurrentWeatherQuery.data.value?.current_weather.windspeed.toString()
  );

  const weatherDescription = stringOrEmpty(
    localeCurrentWeatherQuery.data.value?.weatherCodeInfo.description.toString()
  );

  const weatherImage = stringOrEmpty(
    localeCurrentWeatherQuery.data.value?.weatherCodeInfo.image.toString()
  );

  return {
    temperature,
    windSpeed,
    weatherDescription,
    weatherImage,
  };
});

const countryInfo = computed(() => {
  const title = stringOrEmpty(selected.value?.title);

  const avatar = stringOrEmpty(selected.value?.avatar);

  const subtitle = stringOrEmpty(selected.value?.subtitle);

  return { title, avatar, subtitle };
});

watch(
  () => weatherInfo.value,
  (newValue) => {
    const isEmpty = Object.values(newValue).some((item) => !item);

    if (!isEmpty) {
      lastViewedCard.value = { ...newValue, ...countryInfo.value };
    }
  }
);
</script>
<template>
  <div class="max-w-sm">
    <v-progress-linear
      indeterminate
      color="primary"
      height="1px"
      class="position-absolute"
      :active="isLoading"
    />
    <v-autocomplete
      chips
      hide-no-data
      return-object
      clearable
      density="compact"
      label="Search location"
      placeholder="Search a location by name (ex: new york)"
      variant="solo"
      bg-color="black"
      v-model:search="searchValue"
      v-model="selected"
      :items="searchResultHistory"
    >
      <template v-slot:item="{ props, item }">
        <v-list-item
          v-bind="props"
          :prepend-avatar="item.raw.avatar"
          :title="item.raw.name"
          :subtitle="item.raw.subtitle"
        ></v-list-item>
      </template>
      <template v-slot:chip="{ props, item }">
        <v-chip
          v-bind="props"
          :prepend-avatar="item.raw.avatar"
          :text="item.raw.name"
        ></v-chip>
      </template>
    </v-autocomplete>
    <div v-if="!lastViewedCard">
      <div class="h-236 d-flex flex-column align-center justify-center h-full">
        <v-icon :icon="mdiSearchWeb" />
        <div class="text-subtitle-1">Search is empty.</div>
        <div class="text-caption">Search a location to get started.</div>
      </div>
    </div>
    <WeatherCard v-else v-bind="lastViewedCard" />
  </div>
</template>
<style scoped>
.max-w-sm {
  max-width: 640px;
}

.h-236 {
  height: 236px;
}
</style>
