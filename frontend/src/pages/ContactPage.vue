<template>
    <Hero :data="contactData" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchData } from "@/api";

import Hero from "@/components/Hero.vue";
const contactData = ref([]);

onMounted(async () => {
    const response = await fetchData("/contact-page?populate=*");
    contactData = {
        title: response.data.HeroTitle,
        description: response.data.HeroDescription,
        image: response.data.HeroImage,
        cta: false,
    };
});
</script>
