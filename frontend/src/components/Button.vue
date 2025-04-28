<template>
    <a
        :href="link"
        class="bg-theme-yellow h-16 flex items-center gap-2 px-8 rounded-xl"
        >{{ title }} <img :src="arrow" alt="->" width="32" height="16"
    /></a>
</template>

<script setup>
import arrow from "@/assets/arrow.svg";
const { type } = defineProps({
    title: null,
    link: null,
});
</script>
