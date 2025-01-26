import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { PrimeVueResolver } from "@primevue/auto-import-resolver";
import Components from "unplugin-vue-components/vite";
import { VitePWA } from "vite-plugin-pwa";

const pwa = VitePWA({
  manifest: {
    name: "W-List - Винная карта",
    short_name: "W-List",
    description: "My awesome PWA application",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180х180",
        type: "image/png",
      },
    ],
  },
  workbox: {
    // Настройки Workbox
    // sourcemap: true,
    globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
  },
  registerType: "autoUpdate",
});

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    noDiscovery: true,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return ["swiper-slide", "swiper-container"].includes(tag);
          },
        },
      },
    }),
    vueDevTools(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
    pwa,
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Все зависимости из node_modules будут в чанке vendor
          }
          if (id.includes("src/components")) {
            return "components"; // Все компоненты в отдельный чанк
          }
        },
      },
    },
  },
});
