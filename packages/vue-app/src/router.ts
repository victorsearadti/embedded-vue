import { createRouter, createWebHashHistory } from "vue-router";
import About from "./pages/About.vue";
import Home from "./pages/Home.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router };
