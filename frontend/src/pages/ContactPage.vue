<template>
    <div>
        <Hero :data="contactData" />

        <section class="section bg-warm" id="susisiekime">
            <div class="container">
                <h2 class="section-title text-theme-blue md:text-center">
                    {{ $t("contactMe") }}
                </h2>

                <ContactForm />
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { fetchData } from "@/api";
import { scrollToHash } from "@/scripts/smoothScroll";
import { useRoute } from "vue-router";
import { useLoaderStore } from "@/stores/loaderStore";
import { useLanguageStore } from "@/stores/languageStore";
import Hero from "@/components/Hero.vue";
import ContactForm from "@/components/ContactForm.vue";
const languageStore = useLanguageStore();
const contactData = ref([]);

const loader = useLoaderStore();

const route = useRoute();

async function loadContent(lang) {
    try {
        const response = await fetchData(
            `/contact-page?locale=${languageStore.currentLang}&populate=*`
        );
        contactData.value = {
            title: response.data.HeroTitle,
            description: response.data.HeroDescription,
            image: response.data.HeroImage,
            cta: false,
        };

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
