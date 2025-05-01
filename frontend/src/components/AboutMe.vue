<template>
    <section class="section bg-theme-blue-light" id="apie-mus">
        <div class="container">
            <div class="flex flex-col md:flex-row items-center">
                <div class="flex-1 mb-10 md:mb-">
                    <img :src="getImageUrl(props.data?.image)" alt="" />
                </div>
                <div class="flex-1">
                    <h2 class="section-title text-white">
                        <span>{{ props.data?.title }}</span>
                        <span
                            class="block text-[2rem] leading-10 tracking-[0.07em] text-theme-yellow mt-4 md:mt-8"
                        >
                            {{ props.data?.heading }}
                        </span>
                    </h2>

                    <div
                        v-html="parsedDescription"
                        class="text-white text-base mb-8"
                    ></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRoute } from "vue-router";

import { marked } from "marked";
import { computed, watch, onMounted } from "vue";
import { scrollToHash } from "@/scripts/smoothScroll";

const route = useRoute();

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

onMounted(async () => {
    scrollToHash(route);
});
watch(
    () => route.hash,
    () => {
        scrollToHash(route);
    }
);

function getImageUrl(image) {
    if (!image) return ""; // null or undefined
    if (Array.isArray(image)) {
        return image[0]?.url || "";
    }
    return image.url || "";
}

const parsedDescription = computed(() => {
    return marked.parse(props?.data?.description || "");
});
</script>
