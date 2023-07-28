import { defineCustomElement } from "vue";
import WidgetImpl from "./Widget.vue";

const Widget = defineCustomElement(WidgetImpl);

export {Widget}
export function register(){
    customElements.define('embedded-widget', Widget)        
}