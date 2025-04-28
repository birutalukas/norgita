<template>
    <section class="section bg-theme-blue-light">
        <div class="container">
            <div class="flex items-center">
                <div class="flex-1">
                    <img :src="props.data?.image?.url" alt="" />
                </div>
                <div class="flex-1">
                    <h2 class="section-title text-white mb-8">
                        <span>{{ props.data?.title }}</span>
                        <span
                            class="block text-[2rem] leading-10 tracking-[0.07em] text-theme-yellow mt-8"
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
import { marked } from "marked";

import { computed } from "vue";

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

console.log("props", props);
const parsedDescription = computed(() => {
    return marked.parse(props?.data?.description || "");
});
</script>
