import {
  Component,
  Plugin,
  createApp,
  defineCustomElement,
  getCurrentInstance,
  h,
} from "vue";

type Args = {
  plugins: Plugin<[]>[];
};

type ComponentWithStyles = Component & { styles?: string[] };

export const defineWidget = (
  component: ComponentWithStyles,
  args: Args = { plugins: [] }
) =>
  defineCustomElement({
    styles: component.styles,
    render: () => h(component),
    setup() {
      const app = createApp({});

      args.plugins.forEach(app.use);

      const inst = getCurrentInstance();

      if (!inst) {
        console.error("No Vue instance found :(");
        return;
      }

      Object.assign(inst.appContext, app._context);
      //@ts-ignore
      Object.assign(inst.provides, app._context.provides);
    },
  });
