import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE");
  const backendUrl = env.VITE_BACKEND_URL || "http://localhost:8080";
  return {
    build: {
      minify: "terser",
    },
    server: {
      proxy: {
        "/api": {
          target: backendUrl,
          secure: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    plugins: [react(), splitVendorChunkPlugin()],
  };
});
