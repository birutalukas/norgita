/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            borderRadius: {
                xl: "2rem",
                DEFAULT: "0.5rem",
            },
        },
    },
    plugins: [],
};
