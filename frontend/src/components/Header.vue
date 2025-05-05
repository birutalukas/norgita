<template>
    <header class="bg-theme-blue py-6 h-32 text-white z-50 relative">
        <div class="container">
            <div class="flex items-center justify-between">
                <div>
                    <a href="/">
                        <img
                            :src="logo"
                            alt="Norgita"
                            width="119"
                            height="87"
                        />
                    </a>
                </div>
                <div class="flex flex-col items-end gap-6">
                    <div class="flex items-center gap-6">
                        <button
                            class="flex items-center gap-2"
                            @click="setLanguage('lt')"
                        >
                            <img
                                :src="lt"
                                alt="Lietuviškai"
                                width="24"
                                height="24"
                            />
                            <span
                                class="hidden md:block"
                                :class="{
                                    'opacity-100':
                                        languageStore.currentLang === 'lt',
                                    'opacity-50':
                                        languageStore.currentLang !== 'lt',
                                }"
                                >Lietuviškai</span
                            >
                        </button>
                        <button
                            class="flex items-center gap-2"
                            @click="setLanguage('nn-NO')"
                        >
                            <img :src="no" alt="Norsk" width="24" height="24" />
                            <span
                                class="hidden md:block"
                                :class="{
                                    'opacity-100':
                                        languageStore.currentLang === 'nn-NO',
                                    'opacity-50':
                                        languageStore.currentLang !== 'nn-NO',
                                }"
                                >Norsk</span
                            >
                        </button>
                    </div>
                    <div class="hidden md:flex items-center gap-8">
                        <MainMenu />
                    </div>
                    <div class="flex md:hidden">
                        <BurgerMenu />
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import logo from "@/assets/logo.svg";
import lt from "@/assets/lt.svg";
import no from "@/assets/no.svg";
import { useLanguageStore } from "@/stores/languageStore"; // Import the store
import MainMenu from "./MainMenu.vue";
import BurgerMenu from "./BurgerMenu.vue";

const languageStore = useLanguageStore();

const { setLanguage } = languageStore;
</script>
