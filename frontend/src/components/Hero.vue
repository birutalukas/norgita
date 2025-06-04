<template>
    <section
        class="section h-[calc(100vh-8rem)] flex items-end lg:items-center justify-start overflow-hidden"
        style="background-image: url('{{ data?.image?.url }}') ;"
    >
        <img
            :src="data?.image?.url"
            alt=""
            class="min-h-full min-w-full object-cover absolute"
        />
        <div class="container relative z-10">
            <div class="max-w-[35rem] flex flex-col items-start gap-4 md:gap-8">
                <h1
                    class="text-[3rem] leading-[3.5rem] tracking-[0.07em] font-bold text-white"
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
                    <Button
                        :link="{ path: '/kontaktai', hash: '#susisiekime' }"
                        title="Susisiekime"
                    />
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
