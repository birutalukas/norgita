<!-- components/PageLoader.vue -->
<template>
    <transition name="fade">
        <div
            v-if="loader.isLoading"
            class="fixed inset-0 bg-theme-blue-dark flex items-center justify-center z-[999]"
        >
            <img :src="logo" alt="Norgita" class="w-[50%]" />
        </div>
    </transition>
</template>

<script setup>
import { useLoaderStore } from "@/stores/loaderStore";
const loader = useLoaderStore();

import logo from "@/assets/logo.svg";
</script>
