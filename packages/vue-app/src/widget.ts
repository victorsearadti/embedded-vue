import WidgetImpl from "./Widget.vue";
import { defineWidget } from "./defineWidget";
import { plugins } from "./plugins";

const Widget = defineWidget(WidgetImpl, { plugins });

export { Widget };
export function register() {
  customElements.define("embedded-widget", Widget);
}
