<template>
    <div>
        <Hero :data="heroData" center />
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
            <div class="container lg:max-w-[48rem]">
                <div class="block w-full lg:max-w-[48rem] mx-auto">
                    <h2 class="section-title text-theme-blue lg:text-center">
                        {{ $t("registrationTitle") }}
                    </h2>
                    <ContactForm :title="heroData?.title" />
                </div>
            </div>
        </section>

        <section
            class="section border-t border-theme-blue"
            v-if="faqItems.length"
        >
            <div class="container lg:max-w-[48rem]">
                <div
                    class="block w-full lg:max-w-[48rem] lg:text-center mx-auto"
                >
                    <h2 class="text-theme-blue section-title mb-8">
                        {{ $t("faqTitle") }}
                    </h2>

                    <Accordion :items="faqItems" :multiple="false" />
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
