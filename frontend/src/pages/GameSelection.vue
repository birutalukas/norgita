<template>
    <section class="section">
        <div class="container text-center">
            <h1 class="section-title">Mokymai</h1>

            <div class="flex flex-col items-center justify-center mt-16">
                <button
                    class="w-64 py-3 bg-indigo-500 text-white font-semibold rounded-xl shadow-md mb-4 hover:bg-indigo-600"
                    @click="startGame('flashcards')"
                >
                    Flashcards
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useLoaderStore } from "@/stores/loaderStore";
const loader = useLoaderStore();

const router = useRouter();

const startGame = (game) => {
    router.push(`/mokymai/${game}`);
};
setTimeout(() => {
    loader.isLoading = false;

    window.dispatchEvent(new Event("resize"));
}, 1000);
</script>
