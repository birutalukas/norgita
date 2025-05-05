import { defineStore } from "pinia";
import { useLanguageStore } from "@/stores/languageStore";
import { fetchData } from "@/api";
import { ref, watch, computed } from "vue";
export const useWordsStore = defineStore("flashcards", () => {
    const languageStore = useLanguageStore();

    const selectedLang = ref(languageStore.currentLang.value);
    const words = ref({
        lt: [],
        "nn-NO": [],
    });

    const filteredWords = computed(() => {
        return words.value[selectedLang.value];
    });

    // Fetch and prepare both LT and NO words
    async function fetchWords() {
        try {
            const data = await fetchData("/flashcards");
            const wordList = data.data;

            words.value["lt"] = wordList.map((word) => ({
                id: word.id,
                main: word.Word,
                translation: word.Translation,
                status: "learning",
            }));

            words.value["nn-NO"] = wordList.map((word) => ({
                id: word.id,
                main: word.Translation,
                translation: word.Word,
                status: "learning",
            }));
        } catch (error) {
            console.error("Failed to fetch flashcards:", error);
        }
    }

    // Toggle status (e.g., known/learning)
    function toggleStatus(id) {
        const word = words.value[selectedLang.value].find((w) => w.id === id);
        if (word) {
            word.status = word.status === "known" ? "learning" : "known";
        }
    }

    // Sync initially
    selectedLang.value = languageStore.currentLang;

    // React to language change
    watch(
        () => languageStore.currentLang,
        (newLang) => {
            selectedLang.value = newLang;
        }
    );

    return {
        selectedLang,
        words,
        filteredWords,
        fetchWords,
        toggleStatus,
    };
});
