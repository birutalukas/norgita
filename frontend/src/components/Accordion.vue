<template>
    <div class="accordion">
        <div
            v-for="(item, index) in items"
            :key="index"
            class="border-b border-theme-blue"
        >
            <button
                class="!text-[1.5rem] !font-semibold w-full py-6 flex items-center justify-between"
                @click="toggle(index)"
                :aria-expanded="isOpen(index)"
            >
                <span> {{ item.Title }} </span>

                <span
                    class="transition-all duration-300"
                    :class="{ 'rotate-180': isOpen(index) }"
                    >⌄</span
                >
            </button>

            <div
                :id="`body-${index}`"
                v-show="isOpen(index)"
                style="overflow: hidden"
            >
                <div class="pb-8">
                    <slot :name="`content-${index}`">
                        <div v-html="renderContent(item.Content)"></div>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { renderContent } from "@/helpers/render";
import gsap from "gsap";

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
});

const openIndexes = ref([]);

function toggle(index) {
    const isOpened = isOpen(index);
    if (isOpened) {
        close(index);
    } else {
        open(index);
    }
}

function isOpen(index) {
    return openIndexes.value.includes(index);
}

function open(index) {
    openIndexes.value.push(index);
    nextTick(() => {
        const el = document.querySelector(`#body-${index}`);
        if (el) {
            gsap.fromTo(
                el,
                { height: 0, opacity: 0 },
                {
                    height: el.scrollHeight,
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                    clearProps: "height",
                }
            );
        }
    });
}

function close(index) {
    const el = document.querySelector(`#body-${index}`);
    if (el) {
        gsap.to(el, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                openIndexes.value = openIndexes.value.filter(
                    (i) => i !== index
                );
            },
        });
    }
}
</script>
