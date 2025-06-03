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

        <section
            class="section border-b border-theme-blue overflow-hidden"
            v-if="schedule.length"
        >
            <div class="container relative">
                <h2 class="section-title text-center text-theme-blue-dark">
                    {{ $t("scheduleTitle") }}
                </h2>

                <div
                    id="schedule-scroll-container"
                    class="overflow-x-auto w-[calc(100%+1.25rem)] md:w-[calc(100%+2rem)] lg:w-full -mr-5 md:-mr-8 lg:mr-0"
                >
                    <div
                        id="schedule-header"
                        class="min-w-fit flex items-center justify-between py-4 border-b border-theme-blue-light"
                    >
                        <span
                            class="text-center min-w-[6rem] whitespace-nowrap font-bold"
                            >{{ $t("scheduleLevel") }}</span
                        >
                        <span
                            class="text-center min-w-[18rem] whitespace-nowrap font-bold"
                            >{{ $t("scheduleDate") }}</span
                        >
                        <span
                            class="text-center min-w-[18rem] whitespace-nowrap font-bold"
                            >{{ $t("scheduleDays") }}</span
                        >
                        <span
                            class="text-center min-w-[18rem] whitespace-nowrap font-bold"
                            >{{ $t("scheduleTime") }}</span
                        >
                        <span
                            class="text-center min-w-[8rem] whitespace-nowrap font-bold"
                            >{{ $t("scheduleDuration") }}</span
                        >
                        <span
                            class="text-center min-w-[8rem] whitespace-nowrap font-bold"
                            >{{ $t("schedulePrice") }}</span
                        >
                    </div>

                    <div v-for="(s, index) in schedule">
                        <div
                            class="min-w-fit flex items-center justify-between py-4"
                            :class="{
                                'border-b border-theme-blue-light':
                                    index < paged - 1,
                            }"
                            v-if="index < paged"
                        >
                            <span
                                class="text-center min-w-[6rem] whitespace-nowrap"
                                >{{ s.Level }}</span
                            >
                            <span
                                class="text-center min-w-[18rem] whitespace-nowrap"
                                >{{ s.CourseStartDate }} -
                                {{ s.CourseEndDate }}</span
                            >
                            <span
                                class="text-center min-w-[18rem] whitespace-nowrap"
                                >{{
                                    getActiveDays(
                                        s,
                                        languageStore.currentLang
                                    ).join(", ")
                                }}</span
                            >
                            <span
                                class="text-center min-w-[18rem] whitespace-nowrap"
                                >{{ s.CourseStartTime }} -
                                {{ s.CourseEndTime }}</span
                            >

                            <span
                                class="text-center min-w-[8rem] whitespace-nowrap"
                                >{{ s.TimeTotal }} val.</span
                            >
                            <span
                                class="text-center min-w-[8rem] whitespace-nowrap"
                                >{{ s.Price }} kr</span
                            >
                        </div>
                    </div>
                </div>
            </div>

            <button
                class="block mx-auto w-fit font-bold h-12 mt-20 border border-theme-blue bg bg-transparent px-8 rounded-xl hover:bg-theme-blue hover:text-white transition-all duration-500"
                v-if="schedule.length > paged"
                @click="loadMore()"
            >
                {{ $t("showMore") }}
            </button>
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
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { useRoute } from "vue-router";
import { fetchData } from "@/api";
import { onMounted, ref, watch, nextTick } from "vue";
import { renderContent } from "@/helpers/render";
import { useLanguageStore } from "@/stores/languageStore";
import { useLoaderStore } from "@/stores/loaderStore";
import Hero from "@/components/Hero.vue";
import Accordion from "@/components/Accordion.vue";
import ContactForm from "@/components/ContactForm.vue";
import Button from "@/components/Button.vue";

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const pageID = route.params.slug;

const service = ref([]);
const heroData = ref([]);
const content = ref([]);
const schedule = ref([]);
const faqItems = ref([]);
const loader = useLoaderStore();

const languageStore = useLanguageStore();

const loadStep = 5;
const paged = ref(loadStep);

const weekdayTranslations = {
    lt: {
        Monday: "Pirmadienis",
        Tuesday: "Antradienis",
        Wednesday: "Trečiadienis",
        Thursday: "Ketvirtadienis",
        Friday: "Penktadienis",
        Saturday: "Šeštadienis",
        Sunday: "Sekmadienis",
    },
    "nn-NO": {
        Monday: "Mandag",
        Tuesday: "Tirsdag",
        Wednesday: "Onsdag",
        Thursday: "Torsdag",
        Friday: "Fredag",
        Saturday: "Lørdag",
        Sunday: "Søndag",
    },
};

function getActiveDays(scheduleItem, lang = "lt") {
    const result = [];

    for (const day of Object.keys(weekdayTranslations[lang])) {
        if (scheduleItem[day]) {
            result.push(weekdayTranslations[lang][day]);
        }
    }

    return result;
}

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
        schedule.value = localized.Schedule;
        faqItems.value = localized?.Accordion;

        loader.isLoading = false;
        window.dispatchEvent(new Event("resize"));
    } catch (e) {
        console.error("Error loading service page:", e);
    }
}

function loadMore() {
    paged.value += loadStep;
}

onMounted(async () => {
    await loadContent(languageStore.currentLang);

    await nextTick();

    // Now safely initialize ScrollTrigger
    const header = document.querySelector("#schedule-header");
    const content = document.querySelector("#schedule-scroll-container");

    if (header && content) {
        // Pin the header vertically
        ScrollTrigger.create({
            trigger: header,
            start: "top top",
            translateX: content.scrollLeft,
            endTrigger: content,
            end: "bottom top",
            pin: true,
            pinSpacing: false,
        });

        // Sync horizontal scroll
        content.addEventListener("scroll", () => {
            console.log("header.scrollLeft", header.scrollLeft);
            console.log("content.scrollLeft", content.scrollLeft);
            header.style.transform = `translateX(-${content.scrollLeft})px`;
        });
    }
});

watch(
    () => languageStore.currentLang,
    (newLang) => {
        loadContent(newLang);
    }
);
</script>
