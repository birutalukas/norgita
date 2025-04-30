<template>
    <Hero :data="contactData" />

    <section class="section bg-warm">
        <div class="container">
            <h2 class="section-title text-theme-blue text-center">
                Susisiekime
            </h2>

            <form
                @submit.prevent="submitHandler"
                class="block w-full max-w-[48rem] mx-auto mt-[3.75rem]"
            >
                <div class="w-full mb-8">
                    <label
                        class="block text-white text-[1.25rem] leading-6 mb-4 text-theme-blue-dark"
                        for="name"
                        >Vardas</label
                    >
                    <input
                        class="w-full bg-theme-warm h-14"
                        type="text"
                        name="name"
                        id="name"
                        v-model="form.name"
                        required
                    />
                </div>
                <div class="w-full mb-8">
                    <label
                        class="block text-white text-[1.25rem] leading-6 mb-4 text-theme-blue-dark"
                        for=""
                        >El. paštas</label
                    >
                    <input
                        class="w-full bg-theme-warm h-14"
                        type="email"
                        name="email"
                        id="email"
                        v-model="form.email"
                        required
                    />
                </div>
                <div class="w-full mb-8">
                    <label
                        class="block text-white text-[1.25rem] leading-6 mb-4 text-theme-blue-dark"
                        for="tel"
                        >Telefono nr.</label
                    >
                    <input
                        class="w-full bg-theme-warm h-14"
                        type="tel"
                        name="tel"
                        id="tel"
                        v-model="form.tel"
                    />
                </div>
                <div class="w-full mb-8">
                    <label
                        class="block text-white text-[1.25rem] leading-6 mb-4 text-theme-blue-dark"
                        for="message"
                        >Žinutė</label
                    >
                    <textarea
                        class="w-full bg-theme-warm"
                        name="message"
                        id="message"
                        v-model="form.message"
                        required
                    ></textarea>
                </div>
                <div class="w-full">
                    <button type="submit">Siųsti</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchData } from "@/api";
import { API_BASE_URL } from "@/api";
import Hero from "@/components/Hero.vue";

const contactData = ref([]);
const form = ref({
    name: "",
    email: "",
    tel: "",
    message: "",
});

onMounted(async () => {
    const response = await fetchData("/contact-page?populate=*");
    contactData.value = {
        title: response.data.HeroTitle,
        description: response.data.HeroDescription,
        image: response.data.HeroImage,
        cta: false,
    };
});

const submitHandler = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form.value),
        });

        console.log("res", res);
        if (!res.ok) {
            throw new Error("Failed to send message");
        }

        alert("Message sent!");
        form.value = { name: "", email: "", tel: "", message: "" }; // Reset form
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong");
    }
};
</script>
