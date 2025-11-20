import { defineConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";
import { SearchPlugin } from "vitepress-plugin-search";
import { AnnouncementPlugin } from "vitepress-plugin-announcement";
import AutoImportComponents from "unplugin-vue-components/vite";
import AutoImportAPIs from "unplugin-auto-import/vite";
import VueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    srcDir: "docs",
    vite: {
      plugins: [
        tailwindcss(),
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

        SearchPlugin({
          tokenize: "full",
          minLength: 2,
          buttonLabel: "Search",
          placeholder: "Search docs",
        }),
      ],
    },

    title: "Kaspi Delivery Public Docs",
    titleTemplate: ":title - Kaspi Delivery Public Docs",
    description: "Kaspi Delivery Public Docs",
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
        { text: "Home", link: "/" },
        { text: "Examples", link: "/markdown-examples" },
      ],

      sidebar: [
        {
          text: "Examples",
          items: [
            { text: "Markdown Examples", link: "/markdown-examples" },
            { text: "Runtime API Examples", link: "/api-examples" },
          ],
        },
      ],

      socialLinks: [
        { icon: "github", link: "https://github.com/vuejs/vitepress" },
      ],
    },
    pwa: {},
  })
);
