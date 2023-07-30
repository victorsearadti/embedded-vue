import { Plugin } from "vue";
import { router } from "./router";
import { vuetify } from "./vuetify";

const plugins: Plugin<[]>[] = [router, vuetify];

export { plugins };
