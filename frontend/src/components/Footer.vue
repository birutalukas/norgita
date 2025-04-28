<template>
    <footer class="bg-theme-blue-dark text-white">
        <div class="container py-16">
            <div class="flex items-start">
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
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="container">
            <div class="pb-10">
                <span> © {{ currentYear }} Norgita</span>
            </div>
        </div>
    </footer>
</template>

<script setup>
import logo from "@/assets/logo.svg";
const currentYear = new Date().getFullYear();
</script>
