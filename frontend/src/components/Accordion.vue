<template>
    <div class="accordion">
        <div
            v-for="(item, index) in items"
            :key="index"
            class="border-b border-theme-blue"
        >
            <button
                class="text-theme-blue text-[1.5rem] !ont-semibold w-full py-6 flex items-center justify-between"
                @click="toggle(index)"
                :aria-expanded="isOpen(index)"
            >
                <span> {{ item.Title }} </span>

                <span
                    class="origin-center transition-all duration-300"
                    :class="{ 'scale-y-[-1]': isOpen(index) }"
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
import { lenis } from "@/scripts/smoothScroll.js";
const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
});

const openIndexes = ref([0]);

function toggle(index) {
    const isOpened = isOpen(index);
    if (!isOpened) {
        open(index);
    }
}

function isOpen(index) {
    return openIndexes.value.includes(index);
}

function open(index) {
    openIndexes.value.forEach((index) => {
        close(index);
    });

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
                    onComplete: () => {
                        lenis.scrollTo(el, {
                            offset: -130,
                            duration: 0.4,
                            easing: (t) =>
                                t < 0.5
                                    ? 4 * t * t * t
                                    : 1 - Math.pow(-2 * t + 2, 3) / 2,
                        });
                    },
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
