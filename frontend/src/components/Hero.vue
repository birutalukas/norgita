<template>
    <section
        class="section h-[calc(100vh-8rem)] flex items-center justify-start overflow-hidden"
        style="background-image: url('{{ data?.image?.url }}') ;"
    >
        <img
            :src="data?.image?.url"
            alt=""
            class="min-h-full min-w-full object-cover absolute inset-0"
        />
        <div class="container relative z-10">
            <div class="max-w-[35rem] flex flex-col items-start gap-8">
                <h1
                    class="text-[3.5rem] leading-[4rem] tracking-[0.07em] font-[700] text-white"
                >
                    {{ data.title }}
                </h1>
                <p
                    v-for="(paragraph, index) in paragraphs"
                    :key="index"
                    class="text-white text-base"
                >
                    {{ paragraph }}
                </p>
                <div v-if="data.cta">
                    <Button link="/" title="Registruotis" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from "vue";
import Button from "@/components/Button.vue";
const { data } = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

const paragraphs = computed(() => {
    return data?.description?.split("\n\n");
});
</script>
