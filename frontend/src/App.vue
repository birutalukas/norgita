<template>
    <PageLoader />
    <Header />

    <main id="page-wrap">
        <Suspense>
            <template #default>
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </template>
            <template #fallback>
                <div>Loading...</div>
            </template>
        </Suspense>
    </main>

    <Footer />
</template>

<script setup>
import { useRouter } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import PageLoader from "@/components/PageLoader.vue";

const router = useRouter();
</script>
