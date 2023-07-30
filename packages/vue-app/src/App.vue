<script setup lang="ts">
import { RouterView } from "vue-router";
import Layout from "./components/Layout.vue";
import { routesConfig } from "./plugins/router";
</script>
<template>
  <Layout :app-routes="routesConfig">
    <RouterView />
  </Layout>
</template>
