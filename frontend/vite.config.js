import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
    build: {
        dist: "public",
        rollupOptions: {
            output: {
                manualChunks: {
                    vue: ["vue", "vue-router", "pinia"],
                    ui: ["swiper", "lenis", "gsap", "vue3-burger-menu"],
                },
            },
        },
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) =>
                        tag.startsWith("swiper-container") ||
                        tag.startsWith("swiper-slide") ||
                        tag.startsWith("Menu"),
                },
            },
        }),
    ],
    optimizeDeps: {
        include: ["gsap"], // If Vite has issues resolving gsap, try including it here
    },
    define: {
        "process.env": process.env, // If you need to use environment variables
    },
    server: {
        proxy: {
            "/api": "http://localhost:1337", // Strapi URL
        },
    },
    resolve: {
        alias: {
            "@": "/src", // Alias @ taking dir from 'src'
        },
    },
});
