<template>
    <Hero :data="heroData" />
    <section class="section bg-theme-warm">
        <div class="container">
            <h1 class="section-title text-center mb-4 text-theme-blue-light">
                {{ service.Title }}
            </h1>

            {{ service.ShortDescription }}
        </div>
    </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { fetchData } from "@/api";
import { onMounted, ref } from "vue";

import Hero from "@/components/Hero.vue";
const route = useRoute();
const serviceId = route.params.id;

const service = ref([]);
const heroData = ref([]);

onMounted(async () => {
    console.log("serviceId", serviceId);
    const response = await fetchData("/services/");

    console.log("response", response);
    service.value = response.data.find(
        (s) => String(s.id) === String(serviceId)
    );

    console.log("service", service);
    heroData.value = {
        image: service.value.Cover,
        title: service.value.Title,
        description: service.value.ShortDescription,
        cta: false,
    };
    console.log(service);
});
</script>
