<template>
    <div class="flex flex-col items-center justify-center">
        <h1 class="text-2xl font-bold mb-6">Mokymai</h1>
        <button
            class="w-64 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md mb-4 hover:bg-indigo-600"
            @click="startGame('flashcards')"
        >
            Flashcards
        </button>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const startGame = (game) => {
    router.push(`/game/${game}`);
};
</script>
