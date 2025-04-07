import { defineStore } from "pinia";
import axios from "axios";

export const useWordsStore = defineStore("flashcards", {
    state: () => ({
        selectedLang: "LT-NO", // Or 'NO-LT'
        words: {
            "LT-NO": [],
            "NO-LT": [],
        },
    }),
    getters: {
        filteredWords(state) {
            return state.words[state.selectedLang];
        },
    },
    actions: {
        async fetchWords() {
            try {
                const response = await axios.get(
                    "http://localhost:1337/api/flashcards"
                );

                const words = response.data.data; // Data array from the API

                // Dynamically categorizing words based on the selected language
                this.words["LT-NO"] = words.map((word) => ({
                    id: word.id,
                    main: word.Word, // "Word" will be the main word for LT-NO
                    translation: word.Translation, // "Translation" will be the translation for LT-NO
                }));

                this.words["NO-LT"] = words.map((word) => ({
                    id: word.id,
                    main: word.Translation, // "Translation" will be the main word for NO-LT
                    translation: word.Word, // "Word" will be the translation for NO-LT
                }));
            } catch (error) {
                console.error("Error fetching words:", error);
            }
        },

        setLanguage(lang) {
            this.selectedLang = lang;
        },

        toggleStatus(id) {
            const word = this.words[this.selectedLang].find((w) => w.id === id);
            word.status = word.status === "known" ? "learning" : "known";
        },
    },
});
