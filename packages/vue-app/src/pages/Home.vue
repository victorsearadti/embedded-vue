<script setup lang="ts">
import HelloWorld from "../components/HelloWorld.vue";
</script>
<template>
  <div class="d-flex flex-column gap-lg">
    <div class="d-flex flex-wrap gap-xl">
      <a href="https://vitejs.dev" target="_blank">
        <img src="../assets/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
      <a href="https://vuetifyjs.com" target="_blank">
        <img
          src="../assets/vuetify.svg"
          class="logo vuetify"
          alt="Vuetify logo"
        />
      </a>
    </div>
    <HelloWorld msg="Vite + Vue + Vuetify" />
  </div>
</template>
<style scoped>
.gap-lg {
  gap: 1.5rem;
}
.logo {
  height: 6rem;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.logo.vuetify:hover {
  filter: drop-shadow(0 0 2em rgba(70, 149, 239, 0.7));
}

.gap-xl {
  gap: 2rem;
}
</style>
