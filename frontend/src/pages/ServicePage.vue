<template>
    <div>
        <Hero :data="heroData" />
        <section class="section bg-theme-warm">
            <div class="container lg:max-w-[48rem]">
                <div class="block w-full lg:max-w-[48rem] mx-auto">
                    <!-- <h2
                        class="section-title lg:text-center mb-8 text-theme-blue-light"
                    >
                        {{ service.Title }}
                    </h2> -->

                    <div v-html="renderContent(content)"></div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div
                    class="block sm:grid sm:grid-cols-12 lg:gap-8 w-full mx-auto"
                >
                    <div class="md:col-span-5">
                        <h2
                            class="section-title text-theme-blue-dark sm:sticky sm:top-16"
                        >
                            {{ $t("registrationTitle") }}
                        </h2>
                    </div>
                    <div class="md:col-span-7">
                        <ContactForm :title="heroData?.title" />
                    </div>
                </div>
            </div>
        </section>

        <section
            class="section border-t border-theme-blue"
            v-if="faqItems.length"
        >
            <div class="container">
                <div
                    class="block lg:grid lg:grid-cols-12 lg:gap-8 w-full mx-auto"
                >
                    <div class="md:col-span-5">
                        <h2
                            class="section-title text-theme-blue-dark sm:sticky sm:top-16"
                        >
                            {{ $t("faqTitle") }}
                        </h2>
                    </div>
                    <div class="md:col-span-7">
                        <div class="ml-auto">
                            <div class="w-full">
                                <Accordion
                                    :items="faqItems"
                                    :multiple="false"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { fetchData } from "@/api";
import { onMounted, ref, watch } from "vue";
import { renderContent } from "@/helpers/render";
import { useLanguageStore } from "@/stores/languageStore";
import { useLoaderStore } from "@/stores/loaderStore";
import Hero from "@/components/Hero.vue";
import Accordion from "@/components/Accordion.vue";
import ContactForm from "@/components/ContactForm.vue";

const route = useRoute();
const pageID = route.params.slug;

const service = ref([]);
const heroData = ref([]);
const content = ref([]);
const faqItems = ref([]);
const loader = useLoaderStore();

const languageStore = useLanguageStore();

async function loadContent(lang) {
    try {
        const response = await fetchData(`/services/?populate=*`);

        const currentService = response.data.find(
            (s) => String(s.Slug) === String(pageID)
        );

        console.log("currentService", currentService);
        // Fallback if no match
        if (!currentService) {
            console.error("Service not found for this ID.");
            return;
        }

        // Find localized version for target language
        const localized =
            lang === currentService.locale
                ? currentService
                : currentService.localizations.find(
                      (loc) => loc.locale === lang
                  );

        if (!localized) {
            console.warn(`No localization found for lang: ${lang}`);
            return;
        }

        console.log("localized", localized);
        service.value = localized;
        heroData.value = {
            image: localized?.PageCover,
            title: localized?.Title,
            description: localized?.CardInfo?.ShortDescription,
            cta: false,
        };

        content.value = localized.Content;

        faqItems.value = localized?.Accordion;

        loader.isLoading = false;
        window.dispatchEvent(new Event("resize"));
    } catch (e) {
        console.error("Error loading service page:", e);
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
</script>
