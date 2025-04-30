<template>
    <section class="section bg-warm">
        <div class="container">
            <h2 class="section-title text-theme-blue text-center">
                Mokymai ir paslaugos
            </h2>
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[3.75rem]"
            >
                <div
                    v-for="service in services"
                    :key="service.id"
                    class="p-5 pb-8 bg-theme-blue-dark text-center flex flex-col justify-between"
                >
                    <div class="mb-8">
                        <img
                            :src="service.CardCover?.url"
                            class="mb-8 w-full h-[15rem] object-cover"
                        />

                        <h3
                            class="text-theme-warm text-[1.5rem] leading-8 tracking-[0.07em] font-[700] mb-3"
                        >
                            {{ service?.Title }}
                        </h3>
                        <p
                            class="text-white text-[1.125rem] leading-6 tracking-[-0.025rem] font-[400]"
                        >
                            {{ service?.ShortDescription }}
                        </p>
                    </div>
                    <Button
                        title="Registruotis"
                        :link="`/paslaugos/${service.id}`"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { fetchData } from "@/api";
import { onMounted, ref } from "vue";
import Button from "./Button.vue";
const services = ref([]);

onMounted(async () => {
    const response = await fetchData("/services?populate=*");

    console.log("servizz", response);

    services.value = response.data;
});
</script>
