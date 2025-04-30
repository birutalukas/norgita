import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
    build: {
        dist: "public",
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) =>
                        tag.startsWith("swiper-container") ||
                        tag.startsWith("swiper-slide"),
                },
            },
        }),
    ],
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
