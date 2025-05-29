<template>
    <div class="container">
        <section class="section">
            <swiper-container ref="swiperEl" style="overflow: visible">
                <swiper-slide
                    v-for="word in filteredWords"
                    :key="word.id"
                    style="overflow: visible"
                >
                    <div class="p-4 min-h-96">
                        <div
                            class="border border-blue-200 rounded-xl shadow-md p-8 flex flex-col items-center justify-center relative min-h-full"
                        >
                            <p class="font-bold text-xl my-4">
                                {{ word.main }}
                            </p>

                            <button
                                @click="toggleTranslation(word.id)"
                                class="absolute border border-blue-200 rounded-full w-10 h-10 top-8 right-8"
                            >
                                i
                            </button>

                            <button
                                @click="playAudio(word.audio)"
                                class="border border-blue-200 rounded-full w-10 h-10 mb-8"
                            >
                                🔊
                            </button>

                            <div
                                class="overflow-hidden transition-[height] duration-300 ease-in-out"
                                :style="{
                                    height:
                                        expandedWordId === word.id
                                            ? translationHeights[word.id] + 'px'
                                            : '0px',
                                }"
                                ref="translationRefs"
                                :ref_for="true"
                                :ref_key="word.id"
                            >
                                <p class="text-lg">{{ word.translation }}</p>
                            </div>

                            <button
                                @click="toggleStatus(word.id)"
                                class="min-w-full py-3 mt-8 transition-all duration-300"
                                :class="{
                                    'bg-green-500 text-white font-semibold rounded-xl shadow-md hover:bg-green-600':
                                        word.status === 'known',
                                    'bg-theme-blue text-white font-semibold rounded-xl shadow-md hover:bg-blue-600':
                                        word.status !== 'known',
                                }"
                            >
                                {{
                                    word.status === "known"
                                        ? "Moku"
                                        : "Mokysiuosi"
                                }}
                            </button>
                        </div>
                    </div>
                </swiper-slide>
            </swiper-container>
        </section>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref, reactive, nextTick, computed, watch } from "vue";
import { useLanguageStore } from "@/stores/languageStore";
import { useLoaderStore } from "@/stores/loaderStore";
import "swiper/css";
import { register } from "swiper/element/bundle";
import { Howl } from "howler";
import { fetchData } from "@/api";
// Register Swiper custom elements
register();

const route = useRoute();
const pageID = route.params.id;

const swiperEl = ref(null);

const openedTranslationId = ref(null);
const expandedWordId = ref(null);
const translationRefs = ref({});
const translationHeights = reactive({});

const toggleTranslation = async (id) => {
    if (expandedWordId.value === id) {
        // Collapse
        expandedWordId.value = null;
    } else {
        expandedWordId.value = id;
        await nextTick(); // Wait for DOM update
        updateTranslationHeight(id);
    }
};

const updateTranslationHeight = (id) => {
    const el = translationRefs.value[id];
    if (el) {
        translationHeights[id] = el.scrollHeight;
    }
};

const playAudio = (audioFile) => {
    const sound = new Howl({ src: [`/audio/${audioFile}`] });
    sound.play();
};
const loader = useLoaderStore();

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

// Toggle status (e.g., known/learning)
function toggleStatus(id) {
    const word = words.value[selectedLang.value].find((w) => w.id === id);
    if (word) {
        word.status = word.status === "known" ? "learning" : "known";
    }
}

// Sync initially
selectedLang.value = languageStore.currentLang;

onMounted(async () => {
    try {
        const response = await fetchData("/dictionaries/?populate=*");

        const currentDictionary = response.data.find(
            (d) => String(d.id) === String(pageID)
        );

        // Fallback if no match
        if (!currentDictionary) {
            console.error("Service not found for this ID.");
            return;
        }

        words.value["lt"] = currentDictionary.Dictionary.map((word) => ({
            id: word.id,
            main: word.Word,
            translation: word.Translation,
            status: "learning",
        }));

        words.value["nn-NO"] = currentDictionary.Dictionary.map((word) => ({
            id: word.id,
            main: word.Translation,
            translation: word.Word,
            status: "learning",
        }));
    } catch (error) {
        console.error("Failed to fetch dictionaries:", error);
    }

    const swiperParams = {
        slidesPerView: 1,
        loop: true,
        pagination: true,

        breakpoints: {
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    };

    // Safe assignment after DOM is rendered
    if (swiperEl.value) {
        Object.assign(swiperEl.value, swiperParams);
        swiperEl.value.initialize();
    }

    loader.isLoading = false;

    window.dispatchEvent(new Event("resize"));
});
// React to language change
watch(
    () => languageStore.currentLang,
    (newLang) => {
        selectedLang.value = newLang;
    }
);
watch(openedTranslationId, (newVal, oldVal) => {
    if (oldVal !== null && newVal !== oldVal) {
        collapseHeight(oldVal);
    }
});
</script>
