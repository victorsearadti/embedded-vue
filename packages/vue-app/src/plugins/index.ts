import { Plugin } from "vue";
import { router } from "./router";
import { vueQuery } from "./vueQuery";
import { vuetify } from "./vuetify";

const plugins: Plugin<[]>[] = [router, vueQuery, vuetify];

export { plugins };
