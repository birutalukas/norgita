<template>
    <div
        class="flex items-end justify-between gap-8 xl:flex-col xl:items-start"
    >
        <a href="/">
            <img :src="logo" alt="Norgita" width="119" height="87" />
        </a>

        <div class="flex gap-8">
            <a
                href="https://www.facebook.com/profile.php?id=100091910817924"
                target="_blank"
            >
                <img
                    :src="facebook"
                    alt="Visi Norgita on Facebook"
                    width="30"
                    height="30"
                    v-if="!dark"
                />
                <img
                    :src="facebookDark"
                    alt="Visi Norgita on Facebook"
                    width="30"
                    height="30"
                    v-if="dark"
                />
            </a>
            <a
                href="https://www.instagram.com/norgita_norvegu_kalbos_mokykla/"
                target="_blank"
            >
                <img
                    :src="instagram"
                    alt="Visi Norgita on Instagram"
                    width="30"
                    height="30"
                    v-if="!dark"
                />
                <img
                    :src="instagramDark"
                    alt="Visi Norgita on Instagram"
                    width="30"
                    height="30"
                    v-if="dark"
                />
            </a>
        </div>
    </div>
</template>

<script setup>
import logo from "@/assets/logo.svg";
import facebook from "@/assets/facebook.svg";
import facebookDark from "@/assets/facebookDark.svg";
import instagram from "@/assets/instagram.svg";
import instagramDark from "@/assets/instagramDark.svg";

const props = defineProps({
    dark: null,
});
</script>
