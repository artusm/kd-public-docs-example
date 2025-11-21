import { defineConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";
import { SearchPlugin } from "vitepress-plugin-search";
import { AnnouncementPlugin } from "vitepress-plugin-announcement";
import AutoImportComponents from "unplugin-vue-components/vite";
import AutoImportAPIs from "unplugin-auto-import/vite";
import VueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";
import { useSidebar } from "vitepress-openapi";
import {
  groupIconVitePlugin,
  groupIconMdPlugin,
} from "vitepress-plugin-group-icons";

import { parse, stringify } from "yaml";
import fs from "node:fs";
import path from "node:path";

const spec = parse(
  fs.readFileSync(
    path.join(import.meta.dirname, "../docs/public/openapi.yaml"),
    "utf8"
  )
);

const logo = fs.readFileSync(
  path.join(import.meta.dirname, "../docs/public/images/ks-logo.svg"),
  "utf8"
);

const sidebar = useSidebar({
  spec,
  // Optionally, you can specify a link prefix for all generated sidebar items. Default is `/operations/`.
  linkPrefix: "/operations/",
});

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    markdown: {
      config(md) {
        md.use(groupIconMdPlugin);
      },
    },
    srcDir: "docs",
    vite: {
      plugins: [
        tailwindcss(),
        AnnouncementPlugin({
          title: "🚨 Announcement",
          body: [
            {
              type: "text",
              content:
                "A new version of the API is available. Please review the changelog for details.",
            },
          ],
        }),
        // For details, refer to https://github.com/antfu/unplugin-auto-import#configuration
        AutoImportAPIs({
          include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/, // .md
            /\.mdx$/, // .mdx
          ],
          imports: [
            "vue",
            "vue-router",
            // 'vue-i18n',
            // 'vue/macros',
            "@vueuse/core",
            "pinia",
          ],
          dirs: [
            /* Please ensure that you update the filenames and paths to accurately match those used in your project. */
            // Path must be relative to Vitepress's srcDir
            "composables",
            "utils",
            "stores",
            "**/pg-*/**", // To auto-import composables from Vue Designer plugins.
          ],
          vueTemplate: true,
          dts: "auto-imports.d.ts",
        }),

        // For details, refer to https://github.com/antfu/unplugin-vue-components#configuration
        AutoImportComponents({
          /* Please ensure that you update the filenames and paths to accurately match those used in your project. */
          // Path must be relative to Vitepress's srcDir
          dirs: ["components"],

          // allow auto load markdown components under ./src/components/
          extensions: ["vue", "md"],

          // allow auto import and register components used in markdown
          include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.mdx?/],

          // resolvers: [], // Auto-import using resolvers
          dts: "components.d.ts",
        }),
        VueDevTools(),
        groupIconVitePlugin({
          customIcon: {
            curl: "simple-icons:curl", // Custom icon for curl.
          },
          defaultLabels: [
            // Preload icons for specific labels.
            "curl",
            ".ts",
            ".js",
            ".py",
            ".php",
            ".java",
          ],
        }),

        SearchPlugin({
          tokenize: "full",
          minLength: 2,
          buttonLabel: "Search",
          placeholder: "Search docs",
        }),
      ],
    },

    title: "Kaspi Delivery Docs",
    titleTemplate: ":title - Kaspi Delivery",
    description:
      "Public documentation for integrating with Kaspi Delivery APIs.",
    cleanUrls: true,
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === "lite-youtube",
        },
      },
    },
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: "Get started", link: "/getting-started" },
        {
          text: "Guides",
          items: [
            { text: "Create a delivery", link: "/guides/create-delivery" },
            { text: "Webhooks", link: "/guides/webhooks" },
            { text: "Authentication", link: "/guides/authentication" },
          ],
        },
        { text: "API Reference", link: "/api-reference" },
      ],

      sidebar: [
        {
          text: "Overview",
          items: [
            { text: "Welcome", link: "/welcome" },
            { text: "Getting started", link: "/getting-started" },
            { text: "Integration checklist", link: "/guides/checklist" },
          ],
        },
        {
          text: "Guides",
          items: [
            { text: "Authentication", link: "/guides/authentication" },
            { text: "Create a delivery", link: "/guides/create-delivery" },
            { text: "Webhooks & callbacks", link: "/guides/webhooks" },
          ],
        },
        {
          text: "API Reference",
          items: [
            {
              text: "OpenAPI Explorer",
              link: "/api-reference",
              items: [
                ...sidebar.generateSidebarGroups({
                  // Optionally, you can generate sidebar items with another link prefix. Default is `/operations/`.
                  linkPrefix: "/api-reference#",

                  // Optionally, you can specify a list of tags to generate sidebar items. Default is all tags.
                  //tags: [],
                }),
              ],
            },
            { text: "Code samples", link: "/api-examples" },
          ],
        },
      ],

      socialLinks: [
        {
          icon: {
            svg: logo,
          },
          link: "https://kaspi.kz/",
        },
      ],
    },
    pwa: {},
  })
);
