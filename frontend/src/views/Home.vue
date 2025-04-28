<template>
    <Hero />
</template>

<script setup>
import { ref, onMounted } from "vue";

import { fetchData } from "@/api";
import Hero from "@/components/Hero.vue";

const data = ref([]);
onMounted(async () => {
    const data = await fetchData("/homepage?populate=*");
    const homeData = data.data;

    console.log("data", homeData);
});
</script>
