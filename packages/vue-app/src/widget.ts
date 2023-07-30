import App from "./App.vue";
import { defineWidget } from "./defineWidget";
import { plugins } from "./plugins";

const AppWidget = defineWidget(App, { plugins });

export { AppWidget };
export function register() {
  customElements.define("embedded-widget", AppWidget);
}
