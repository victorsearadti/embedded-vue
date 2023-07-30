import { Component, Plugin, createApp, getCurrentInstance, h } from "vue";
import { defineCustomElement } from "./workaround/defineCustomElements";

type Args = {
  plugins: Plugin<[]>[];
};

type ComponentWithStyles = Component & { styles?: string[] };

export const defineWidget = (
  component: ComponentWithStyles,
  args: Args = { plugins: [] }
) =>
  defineCustomElement(
    {
      styles: component.styles,
      render: () => h(component),
      setup() {
        const app = createApp({});

        args.plugins.forEach((item) => app.use(item));

        const inst = getCurrentInstance();

        if (!inst) {
          console.error("No Vue instance found :(");
          return;
        }

        Object.assign(inst.appContext, app._context);
        //@ts-ignore
        Object.assign(inst.provides, app._context.provides);
      },
    },
    { shadowRoot: false }
  );
