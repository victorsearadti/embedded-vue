<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
<template>
  <nav>
    <div>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </div>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
