<template>
    <div>
        <Hero :data="heroData" />
        <section class="section bg-theme-warm">
            <div class="container max-w-[48rem]">
                <div class="block w-full max-w-[48rem] mx-auto">
                    <h2
                        class="section-title md:text-center mb-8 text-theme-blue-light"
                    >
                        {{ service.Title }}
                    </h2>

                    {{ service.ShortDescription }}

                    <div v-html="renderContent(content)"></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { fetchData } from "@/api";
import { onMounted, ref } from "vue";
import { renderContent } from "@/helpers/render";
import { useLanguageStore } from "@/stores/languageStore";
import { useLoaderStore } from "@/stores/loaderStore";
import Hero from "@/components/Hero.vue";

const route = useRoute();
const serviceId = route.params.id;

const service = ref([]);
const heroData = ref([]);
const content = ref([]);
const loader = useLoaderStore();

const { currentLang } = useLanguageStore();

onMounted(async () => {
    console.log("serviceId", serviceId);
    const response = await fetchData(
        `/services?locale=${currentLang}&populate=*`
    );

    service.value = response.data.find(
        (s) => String(s.id) === String(serviceId)
    );

    console.log("service.value", service.value);
    heroData.value = {
        image: service.value.PageCover,
        title: service.value.Title,
        description: service.value.ShortDescription,
        cta: false,
    };

    content.value = service.value.Content;

    console.log(heroData);
    loader.isLoading = false;
    window.dispatchEvent(new Event("resize"));
});
</script>
