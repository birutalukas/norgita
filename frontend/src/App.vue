<template>
    <header>
        <div class="container border-b border-grey-200">
            <div class="flex items-center justify-between py-8">
                <div></div>
                <div class="flex items-center gap-8">
                    <button @click="router.push('/')" class="text-lg">
                        Pradžia
                    </button>
                    <button @click="router.push('/games')" class="text-lg">
                        Mokymai
                    </button>
                </div>
            </div>
        </div>
    </header>
    <div class="bg-grey-100 min-h-screen">
        <div class="container">
            <div class="w-full py-16 sm:py-20 md:py-28">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>
