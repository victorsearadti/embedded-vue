import WidgetImpl from "./Widget.vue";
import { defineWidget } from "./defineWidget";
import { router } from "./router";

const Widget = defineWidget(WidgetImpl, { plugins: [router] });

export { Widget };
export function register() {
  customElements.define("embedded-widget", Widget);
}
