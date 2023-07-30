<script setup lang="ts">
import { mdiHomeCity, mdiInformation } from "@mdi/js";
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
        <v-list-item :prepend-icon="mdiHomeCity" title="Home" to="/" />
        <v-list-item :prepend-icon="mdiInformation" title="About" to="/about" />
      </v-list>
    </v-navigation-drawer>
    <v-main class="h-100">
      <div class="pa-8">
        <slot />
      </div>
    </v-main>
  </v-layout>
</template>
