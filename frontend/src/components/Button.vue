<template>
    <button
        @click="navigate"
        class="bg-theme-yellow h-16 flex justify-center items-center gap-2 px-8 rounded-xl text-[1.5rem] leading-6 font-[700]"
    >
        {{ title }} <img :src="arrow" alt="->" width="32" height="16" />
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
