import { defineStore } from "pinia";

import { fetchData } from "@/api"; // Adjust path as needed

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
                const data = await fetchData("/flashcards");
                const words = data.data;

                this.words["LT-NO"] = words.map((word) => ({
                    id: word.id,
                    main: word.Word,
                    translation: word.Translation,
                }));

                this.words["NO-LT"] = words.map((word) => ({
                    id: word.id,
                    main: word.Translation,
                    translation: word.Word,
                }));
            } catch (error) {
                // Already logged in fetchData
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
