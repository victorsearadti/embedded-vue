import { createApp } from "vue";
import AppVue from "./App.vue";
import { plugins } from "./plugins";

const app = createApp(AppVue);
plugins.forEach((item) => app.use(item));

app.mount("#app");
