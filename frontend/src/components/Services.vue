<template>
    <section class="section bg-theme-warm" id="mokymai-ir-paslaugos">
        <div class="container">
            <h2 class="section-title text-theme-blue md:text-center">
                {{ $t("headingServices") }}
            </h2>
            <div
                class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 md:mt-16"
            >
                <div
                    v-for="service in services"
                    :key="service.id"
                    class="p-5 pb-8 bg-theme-blue-dark md:text-center flex flex-col justify-between"
                >
                    <div class="mb-8">
                        <img
                            :src="service.CardCover?.url"
                            class="mb-8 w-full h-[15rem] object-cover"
                        />

                        <h3
                            class="text-theme-warm text-[1.5rem] leading-8 tracking-[0.07em] font-[700] mb-3"
                        >
                            {{ service?.Title }}
                        </h3>
                        <p
                            class="text-white text-[1.125rem] leading-6 tracking-[-0.025rem] font-[400]"
                        >
                            {{ service?.ShortDescription }}
                        </p>
                    </div>

                    <Button
                        title="Registruotis"
                        :link="`/paslaugos/${service.Slug}`"
                        v-if="!service?.LearningPage"
                    />

                    <Button
                        title="Registruotis"
                        link="/mokymai"
                        v-if="service?.LearningPage"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { fetchData } from "@/api";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useLanguageStore } from "@/stores/languageStore";
import { useLoaderStore } from "@/stores/loaderStore";
import { scrollToHash } from "@/scripts/smoothScroll";
import Button from "./Button.vue";

const route = useRoute();
const services = ref([]);
const loader = useLoaderStore();
const languageStore = useLanguageStore();

async function loadContent(lang) {
    try {
        const response = await fetchData(
            `/services?locale=${languageStore.currentLang}&populate=*&sort=SortOrder:asc`
        );

        services.value = response.data;

        loader.isLoading = false;

        scrollToHash(route);

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

watch(
    () => route.hash,
    () => {
        scrollToHash(route);
    }
);
</script>
