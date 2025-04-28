<template>
    <section class="section bg-theme-blue-light">
        <div class="container">
            <div class="flex items-center">
                <div class="flex-1">
                    <img :src="data?.image?.url" alt="" />
                </div>
                <div class="flex-1">
                    <h2
                        class="text0[3.5rem] leading-[4rem] tracking-[0.07em] font-[700] mb-8"
                    >
                        {{ data?.title }}
                        <span
                            class="block text-[2rem] leading-10 tracking-[0.07em] text-theme-yellow"
                        >
                            {{ data?.heading }}
                        </span>
                    </h2>

                    <p
                        v-for="(paragraph, index) in paragraphs"
                        :key="index"
                        class="text-white text-base mb-8"
                    >
                        {{ paragraph }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from "vue";

const { data } = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

console.log("about", data);
const paragraphs = computed(() => {
    return data?.content?.split("\n\n");
});
</script>
