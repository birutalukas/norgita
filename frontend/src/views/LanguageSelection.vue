<template>
    <div class="flex flex-col items-center justify-center h-full">
        <h1 class="text-2xl font-bold mb-6">Pasirinkite kalbą</h1>
        <button
            class="w-64 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md mb-4 hover:bg-blue-600"
            @click="selectLanguage('LT-NO')"
        >
            Lietuvių → Norvegų
        </button>
        <button
            class="w-64 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
            @click="selectLanguage('NO-LT')"
        >
            Norvegų → Lietuvių
        </button>
    </div>
</template>

<script setup>
import { useWordsStore } from "../stores/words";
import { useRouter } from "vue-router";

const store = useWordsStore();
const router = useRouter();

const selectLanguage = (lang) => {
    store.setLanguage(lang);
    router.push("/mokymai");
};
</script>
