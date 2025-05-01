<template>
    <div>
        <button @click="openMenu">Menu</button>

        <Slide
            :isOpen="isOpen"
            @openMenu="openMenu"
            @closeMenu="closeMenu"
            right
        >
            <div
                class="flex flex-col items-start gap-6 mt-16"
                @click="closeMenu"
            >
                <MainMenu />
            </div>
        </Slide>
    </div>
</template>

<script setup>
import { Slide } from "vue3-burger-menu";
import { ref, watch } from "vue";
import MainMenu from "./MainMenu.vue";

const isOpen = ref(false);

function openMenu() {
    isOpen.value = true;
}

function closeMenu() {
    isOpen.value = false;
}
</script>
