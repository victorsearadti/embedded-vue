<script setup lang="ts">
import { ref } from "vue";
const count = ref(0);
</script>
<template>
  <div class="d-flex flex-column gap-lg">
    <div class="d-flex flex-column gap-sm">
      <v-btn
        :elevation="0"
        :ripple="false"
        width="max-content"
        color="primary"
        type="button"
        @click="count++"
        >count is {{ count }}</v-btn
      >
      <p class="text-body-1">
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>
    <div>
      <p class="text-body-1">
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
          >create-vue</a
        >, the official Vue + Vite starter
      </p>
      <p class="text-body-1">
        Install
        <a href="https://github.com/vuejs/language-tools" target="_blank"
          >Volar</a
        >
        in your IDE for a better DX
      </p>
      <p class="text-body-2">Click on the Vite and Vue logos to learn more</p>
    </div>
  </div>
</template>
<style scoped>
.gap-sm {
  gap: 0.75rem;
}
.gap-lg {
  gap: 1.5rem;
}
</style>
