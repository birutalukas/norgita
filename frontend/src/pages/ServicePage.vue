<template>
    <section class="section">
        <div class="container">
            <h1 class="text-4xl font-bold mb-4">{{ service.Title }}</h1>

            {{ service.ShortDescription }}
        </div>
    </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { fetchData } from "@/api";
import { onMounted, ref } from "vue";

const route = useRoute();
const serviceId = route.params.id;

const service = ref([]);

onMounted(async () => {
    console.log("serviceId", serviceId);
    const response = await fetchData("/services/");

    service.value = response.data.find(
        (s) => String(s.id) === String(serviceId)
    );

    console.log(service);
});
</script>
