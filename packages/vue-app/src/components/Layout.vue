<script setup lang="ts">
import type { AppRoutes } from "../plugins/router";

type Props = {
  appRoutes: AppRoutes[];
};

defineProps<Props>();
</script>
<template>
  <v-layout
    class="h-100 w-100 position-relative bg-vite-black"
    style="min-height: 400px"
  >
    <v-navigation-drawer
      :rail="true"
      permanent
      :absolute="true"
      class="bg-vite-black"
    >
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item
          v-for="route in appRoutes"
          :key="route.path"
          :prepend-icon="route.icon"
          :title="route.title"
          :to="route.path"
        />
      </v-list>
    </v-navigation-drawer>
    <v-main class="h-100">
      <div class="pa-8">
        <slot />
      </div>
    </v-main>
  </v-layout>
</template>
