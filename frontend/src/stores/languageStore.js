// stores/languageStore.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLanguageStore = defineStore("language", () => {
    // Create a reactive reference for the current language
    let currentLang = ref(localStorage.getItem("language") || "lt"); // Default to 'lt'

    // Set language method
    function setLanguage(lang) {
        currentLang.value = lang; // Update the language

        console.log("Language changed to:", lang);
        setTimeout(() => {
            localStorage.setItem("language", lang); // Store language in localStorage
        }, 1000);
    }

    return {
        currentLang,
        setLanguage,
    };
});
