import { createApp } from "vue";
import AppVue from "./App.vue";
import { plugins } from "./plugins";

const app = createApp(AppVue);
plugins.forEach(app.use);
app.mount("#app");
