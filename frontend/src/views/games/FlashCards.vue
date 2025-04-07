<template>
    <div>
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
                            class="min-w-full py-3 mt-8"
                            :class="{
                                'bg-green-500 text-white font-semibold rounded-xl shadow-md hover:bg-green-600':
                                    word.status === 'known',
                                'bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600':
                                    word.status !== 'known',
                            }"
                        >
                            {{
                                word.status === "known" ? "Moku" : "Mokysiuosi"
                            }}
                        </button>
                    </div>
                </div>
            </swiper-slide>
        </swiper-container>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive, nextTick, computed, watch } from "vue";
import { useWordsStore } from "../../stores/words";
import "swiper/css";
import { register } from "swiper/element/bundle";

import { Howl } from "howler";

// Register Swiper custom elements
register();

const swiperEl = ref(null);

const wordsStore = useWordsStore();

// Access the filtered words for the selected language
const filteredWords = computed(() => wordsStore.filteredWords);

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

// Toggle the status of the word when clicked
const toggleStatus = (id) => {
    wordsStore.toggleStatus(id);
};

const playAudio = (audioFile) => {
    const sound = new Howl({ src: [`/audio/${audioFile}`] });
    sound.play();
};

onMounted(async () => {
    await wordsStore.fetchWords();

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
});

watch(openedTranslationId, (newVal, oldVal) => {
    if (oldVal !== null && newVal !== oldVal) {
        collapseHeight(oldVal);
    }
});
</script>
