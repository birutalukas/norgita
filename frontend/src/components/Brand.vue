<template>
    <div class="flex items-end gap-8 xl:flex-col xl:items-start">
        <a href="/">
            <img :src="logo" alt="Norgita" width="119" height="87" />
        </a>

        <a href="https://facebook.com" target="_blank">
            <img :src="facebook" alt="Facebook" width="30" height="30" />
        </a>
    </div>
</template>

<script setup>
import logo from "@/assets/logo.svg";
import facebook from "@/assets/facebook.svg";
</script>
