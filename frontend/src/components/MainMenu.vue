<template>
    <button @click="router.push('/')" class="text-white text-nowrap">
        Mokymai ir paslaugos
    </button>

    <button @click="router.push('/kontaktai')" class="text-white text-nowrap">
        Kontaktai
    </button>
    <a href="https://facebook.com" target="_blank">
        <img :src="facebook" alt="Facebook" width="30" height="30" />
    </a>
</template>

<script setup>
import { useRouter } from "vue-router";
import facebook from "@/assets/facebook.svg";

const router = useRouter();
</script>
