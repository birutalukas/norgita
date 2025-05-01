<template>
    <Hero :data="heroData" />
    <section class="section bg-theme-warm">
        <div class="container max-w-[48rem]">
            <div class="block w-full max-w-[48rem] mx-auto">
                <h2
                    class="section-title text-center mb-8 text-theme-blue-light"
                >
                    {{ service.Title }}
                </h2>

                {{ service.ShortDescription }}

                <div v-html="renderContent(content)"></div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { fetchData } from "@/api";
import { onMounted, ref } from "vue";
import { renderContent } from "@/helpers/render";
import { useLoaderStore } from "@/stores/loaderStore";
import Hero from "@/components/Hero.vue";

const route = useRoute();
const serviceId = route.params.id;

const service = ref([]);
const heroData = ref([]);
const content = ref([]);
const loader = useLoaderStore();

onMounted(async () => {
    console.log("serviceId", serviceId);
    const response = await fetchData("/services/");

    service.value = response.data.find(
        (s) => String(s.id) === String(serviceId)
    );

    heroData.value = {
        image: service.value.Cover,
        title: service.value.Title,
        description: service.value.ShortDescription,
        cta: false,
    };

    content.value = service.value.Content;

    loader.isLoading = false;
    window.dispatchEvent(new Event("resize"));
});
</script>
