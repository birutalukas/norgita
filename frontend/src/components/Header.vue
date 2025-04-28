<template>
    <header class="bg-[#2A4A6C] py-6 h-32 text-white">
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
                            @click="setLanguage('no')"
                        >
                            <img :src="no" alt="Norsk" width="24" height="24" />
                            <span
                                :class="{
                                    'opacity-100':
                                        languageStore.currentLang === 'no',
                                    'opacity-50':
                                        languageStore.currentLang !== 'no',
                                }"
                                >Norsk</span
                            >
                        </button>
                    </div>
                    <div class="flex items-center gap-8">
                        <button
                            @click="router.push('/mokymai')"
                            class="text-lg"
                        >
                            Mokymai ir paslaugos
                        </button>
                        <button>Apie mus</button>
                        <button>Atsiliepimai</button>
                        <button>Kontaktai</button>
                        <a href="">
                            <img
                                :src="facebook"
                                alt="Facebook"
                                width="30"
                                height="30"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import logo from "@/assets/logo.svg";
import facebook from "@/assets/facebook.svg";
import lt from "@/assets/lt.svg";
import no from "@/assets/no.svg";
import { useLanguageStore } from "@/stores/languageStore"; // Import the store
const languageStore = useLanguageStore();

const { setLanguage } = languageStore;
</script>
