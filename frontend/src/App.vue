<template>
    <Header />

    <Suspense>
        <template #default>
            <router-view />
        </template>
        <template #fallback>
            <div>Loading...</div>
        </template>
    </Suspense>

    <Footer />
</template>

<script setup>
import { useRouter } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
const router = useRouter();
</script>
