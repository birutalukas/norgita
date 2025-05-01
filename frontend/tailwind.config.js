/** @type {import('tailwindcss').Config} */

import tailwindcssFontInter from "tailwindcss-font-inter";

export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            borderRadius: {
                xl: "2rem",
                DEFAULT: "0.5rem",
            },
            colors: {
                "theme-warm": "#EDECD8",
                "theme-yellow": "#F6E17F",
                "theme-blue-light": "#406389",
                "theme-blue": "#2A4A6C",
                "theme-blue-dark": "#193553",
            },
        },
    },
    plugins: [tailwindcssFontInter],
};
