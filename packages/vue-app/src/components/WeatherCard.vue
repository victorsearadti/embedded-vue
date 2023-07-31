<script setup lang="ts">
import { mdiWeatherWindy } from "@mdi/js";

export type WeatherCardProps = {
  title: string;
  avatar: string;
  subtitle: string;
  temperature: string;
  weatherImage: string;
  weatherDescription: string;
  windSpeed: string;
};

defineProps<WeatherCardProps>();
</script>
<template>
  <v-card class="bg-vite-black" :elevation="0">
    <div>
      <v-card-item :title="title" :prepend-avatar="avatar">
        <template v-slot:subtitle>
          {{ subtitle }}
        </template>
      </v-card-item>
      <v-card-text class="py-0">
        <v-row align="center" no-gutters class="py-1">
          <v-col class="text-h2"> {{ temperature }}&deg;C </v-col>

          <v-col class="justify-center">
            <div class="d-flex flex-column justify-end align-end">
              <v-icon color="white" :icon="weatherImage" size="4rem"> </v-icon>
              <span class="text-overline">{{ weatherDescription }}</span>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <div class="d-flex py-3 justify-space-between">
        <v-list-item density="compact" :prepend-icon="mdiWeatherWindy">
          <v-list-item-subtitle>{{ windSpeed }} km/h</v-list-item-subtitle>
        </v-list-item>
      </div>
    </div>
  </v-card>
</template>
