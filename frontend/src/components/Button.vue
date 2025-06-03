<template>
    <button
        @click="navigate"
        class="bg-theme-yellow h-12 flex justify-center items-center gap-2 px-8 rounded-xl text-[1.25rem] md:text-[1.5rem] md:leading-6 font-bold group transition-all duration-500"
    >
        <span
            class="translate-x-0 group-hover:-translate-x-4 transition-all duration-500"
        >
            {{ title }}
        </span>

        <img
            :src="arrow"
            alt="->"
            width="32"
            height="16"
            class="translate-x-0 group-hover:translate-x-4 transition-all duration-500"
        />
    </button>
</template>

<script setup>
import { useRouter } from "vue-router";

import arrow from "@/assets/arrow.svg";
const { title, link } = defineProps({
    title: null,
    link: null,
});

const router = useRouter();

function navigate() {
    router.push(link);
}
</script>
