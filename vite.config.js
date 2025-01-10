import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VENDORS, ACTIVE_VENDOR } from "./src/config/vendors";

export default defineConfig({
  plugins: [react()],
  define: {
    __ACTIVE_VENDOR__: JSON.stringify(ACTIVE_VENDOR),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (
            id.includes("HistoryList") &&
            VENDORS[ACTIVE_VENDOR].features.historyEnabled === false
          ) {
            return "exclude-history-list";
          }
        },
      },
      plugins: [
        {
          name: "exclude-feature-specific",
          resolveId(source) {
            if (
              source.includes("HistoryList") &&
              VENDORS[ACTIVE_VENDOR].features.historyEnabled === false
            ) {
              return null;
            }
          },
        },
      ],
    },
  },
});
