import { mdiHome, mdiWeatherPartlyCloudy } from "@mdi/js";
import { Component } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Weather from "../pages/Weather.vue";

type AppRoutes = {
  path: string;
  component: Component;
  title: string;
  icon: string;
};

const routesConfig: AppRoutes[] = [
  { path: "/", component: Home, icon: mdiHome, title: "Home" },
  {
    path: "/weather",
    component: Weather,
    icon: mdiWeatherPartlyCloudy,
    title: "Weather",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routesConfig.map((item) => ({
    path: item.path,
    component: item.component,
  })),
});

export { router, routesConfig };
export type { AppRoutes };
