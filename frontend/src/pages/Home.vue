<template>
    <div>
        <Hero v-if="heroData" :data="heroData" />
        <AboutMe v-if="aboutData" :data="aboutData" />
        <Services />
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { fetchData } from "@/api";
import { useLoaderStore } from "@/stores/loaderStore";
import { useLanguageStore } from "@/stores/languageStore";
import Hero from "@/components/Hero.vue";
import AboutMe from "@/components/AboutMe.vue";
import Services from "@/components/Services.vue";

const heroData = ref([]);
const aboutData = ref([]);
const loader = useLoaderStore();
const languageStore = useLanguageStore();

// const pageContent = ref(null);

async function loadContent(lang) {
    try {
        const response = await fetchData(`/homepage?locale=${lang}&populate=*`);
        // pageContent.value = response.data;

        heroData.value = {
            title: response.data.HeroTitle,
            description: response.data.HeroDescription,
            image: response.data.HeroImage,
            cta: true,
        };
        aboutData.value = {
            title: response.data.IntroTitle,
            heading: response.data.IntroHeading,
            description: response.data.IntroContent,
            image: response.data.IntroImage,
        };

        // await nextTick();

        loader.isLoading = false;

        window.dispatchEvent(new Event("resize"));
    } catch (e) {
        console.error("Error loading content:", e);
    }
}

// Load initially
onMounted(() => {
    loadContent(languageStore.currentLang);
});

// Watch for language changes
watch(
    () => languageStore.currentLang,
    (newLang) => {
        loadContent(newLang);
    }
);
</script>
