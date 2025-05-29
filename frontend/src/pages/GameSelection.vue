<template>
    <section class="section">
        <div class="container text-center">
            <h1 class="section-title">Savarankiško mokymosi užduotys</h1>

            <div
                class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 md:mt-16"
            >
                <div
                    v-for="dictionary in dictionaries"
                    :key="dictionary.id"
                    class="p-5 pb-8 bg-theme-blue-dark md:text-center flex flex-col justify-between"
                >
                    <div class="mb-8">
                        <img
                            :src="dictionary.CardCover?.url"
                            class="mb-8 w-full h-[15rem] object-cover"
                        />

                        <h3
                            class="text-theme-warm text-[1.5rem] leading-8 tracking-[0.07em] font-[700] mb-3"
                        >
                            {{ dictionary?.Title }}
                        </h3>
                        <p
                            class="text-white text-[1.125rem] leading-6 tracking-[-0.025rem] font-[400]"
                        >
                            {{ dictionary?.ShortDescription }}
                        </p>
                    </div>

                    <Button
                        title="Registruotis"
                        :link="`/mokymai/${dictionary.id}`"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLanguageStore } from "@/stores/languageStore";
import { useLoaderStore } from "@/stores/loaderStore";
import { fetchData } from "@/api";

const router = useRouter();

const route = useRoute();
const dictionaries = ref([]);
const loader = useLoaderStore();
const languageStore = useLanguageStore();

async function loadContent(lang) {
    try {
        const response = await fetchData(
            `/dictionaries?locale=${languageStore.currentLang}&populate=*`
        );

        dictionaries.value = response.data;

        loader.isLoading = false;

        window.dispatchEvent(new Event("resize"));
    } catch (e) {
        console.error("Error loading services:", e);
    }
}
onMounted(async () => {
    loadContent(languageStore.currentLang);
});

watch(
    () => languageStore.currentLang,
    (newLang) => {
        loadContent(newLang);
    }
);

setTimeout(() => {
    loader.isLoading = false;

    window.dispatchEvent(new Event("resize"));
}, 1000);
</script>
