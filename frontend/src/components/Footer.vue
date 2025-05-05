<template>
    <footer class="bg-theme-blue-dark text-white">
        <div class="container py-16">
            <div class="block xl:hidden mb-16 xl:mb-0">
                <Brand />
            </div>
            <div
                class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-16 md:gap-8 xl:gap-16"
            >
                <div class="hidden xl:block">
                    <Brand />
                </div>

                <div>
                    <h4 class="text-[1.25rem] leading-6 font-[700] mb-5">
                        {{ $t("servicesTitle") }}
                    </h4>
                    <div class="flex flex-col items-start gap-3 text-left">
                        <button
                            @click="router.push(`/paslaugos/${service.id}`)"
                            class="text-white text-base text-left font-[400]"
                            v-for="service in services"
                            :key="service.id"
                        >
                            {{ service?.Title }}
                        </button>
                    </div>
                </div>
                <div>
                    <h4 class="text-[1.25rem] leading-6 font-[700] mb-5">
                        {{ $t("infoTitle") }}
                    </h4>
                    <div class="flex flex-col items-start gap-3">
                        <button
                            @click="
                                router.push({
                                    path: '/',
                                    hash: '#mokymai-ir-paslaugos',
                                })
                            "
                            class="text-white text-base text-left"
                        >
                            {{ $t("headingServices") }}
                        </button>
                        <button
                            @click="
                                router.push({ path: '/', hash: '#apie-mus' })
                            "
                            class="text-white text-base text-left"
                        >
                            {{ $t("headingAbout") }}
                        </button>

                        <button
                            @click="router.push('/kontaktai')"
                            class="text-white text-base text-left"
                        >
                            {{ $t("headingContact") }}
                        </button>
                    </div>
                </div>
                <div>
                    <h4 class="text-[1.25rem] leading-6 font-[700] mb-5">
                        {{ $t("contactTitle") }}
                    </h4>
                    <div class="flex flex-col gap-3">
                        <a
                            href="tel:+370 600 00000"
                            class="text-white text-base text-left font-[400] underline"
                            >+370 600 00000</a
                        >
                        <a
                            href="mailto:info@norgita.lt"
                            class="text-white text-base text-left font-[400] underline"
                            >info@norgita.lt</a
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="pb-10">
                <span> © {{ currentYear }} Norgita</span>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { fetchData } from "@/api";
import router from "@/router";
import { useLanguageStore } from "@/stores/languageStore";
const { currentLang } = useLanguageStore();

import Brand from "./Brand.vue";
const services = ref([]);
onMounted(async () => {
    const response = await fetchData(
        "/services?locale=${currentLang}&populate=*"
    );

    services.value = response.data;
});

const currentYear = new Date().getFullYear();
</script>
