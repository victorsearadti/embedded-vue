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
  <v-card class="pa-8 bg-vite-black" :elevation="0">
    <div>
      <v-card-item :title="title" :prepend-avatar="avatar">
        <template v-slot:subtitle>
          {{ subtitle }}
        </template>
      </v-card-item>
      <v-card-text class="py-0">
        <v-row align="center" no-gutters class="py-1">
          <v-col class="text-h2" cols="6"> {{ temperature }}&deg;C </v-col>

          <v-col cols="6" class="text-right justify-end">
            <div class="d-flex justify-end">
              <div class="d-flex flex-column justify-center align-center mr-n6">
                <v-icon color="white" :icon="weatherImage" size="4rem">
                </v-icon>
                <span class="text-overline">{{ weatherDescription }}</span>
              </div>
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
