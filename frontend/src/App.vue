<template>
    <Header />

    <div class="bg-grey-100 min-h-screen">
        <div class="container">
            <div class="w-full py-16 sm:py-20 md:py-28">
                <Suspense>
                    <template #default>
                        <router-view />
                    </template>
                    <template #fallback>
                        <div>Loading...</div>
                    </template>
                </Suspense>
            </div>
        </div>
    </div>
    <Footer />
</template>

<script setup>
import { useRouter } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
const router = useRouter();
</script>
