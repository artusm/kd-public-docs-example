// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "virtual:group-icons.css";

import { theme, useTheme, useShiki } from "vitepress-openapi/client";
import "vitepress-openapi/dist/style.css";

import "./tailwind.css";
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  async enhanceApp({ app, router, siteData }) {
    theme.enhanceApp({ app });

    await useShiki().init();

    useTheme({
      requestBody: {
        // Set the default schema view.
        defaultView: "schema", // schema or contentType
      },
      jsonViewer: {
        // How many levels are expanded on load.
        deep: Infinity,
        // Set the JSON viewer renderer.
        renderer: "shiki", // vue-json-pretty or shiki
      },
      response: {
        // Set the response code selector.
        responseCodeSelector: "tabs", // tabs or select
        // Set the maximum number of tabs, after which a Select will be shown.
        maxTabs: 5,
        body: {
          // Set the default view.
          defaultView: "schema", // schema or contentType
        },
      },
    });
  },
} satisfies Theme;
