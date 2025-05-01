<template>
    <div>
        <Hero :data="contactData" />

        <section class="section bg-warm">
            <div class="container">
                <h2 class="section-title text-theme-blue md:text-center">
                    Susisiekime
                </h2>

                <form
                    @submit.prevent="submitHandler"
                    class="relative block w-full max-w-[48rem] mx-auto mt-8 md:mt-16 border border-theme-blue rounded-xl p-8 pb-16"
                    v-if="!mailSent"
                >
                    <div class="w-full mb-8">
                        <label class="form-label" for="name">Vardas</label>
                        <input
                            class="form-input"
                            type="text"
                            name="name"
                            id="name"
                            v-model="form.name"
                            required
                        />
                    </div>
                    <div class="w-full mb-8">
                        <label class="form-label" for="">El. paštas</label>
                        <input
                            class="form-input"
                            type="email"
                            name="email"
                            id="email"
                            v-model="form.email"
                            required
                        />
                    </div>
                    <div class="w-full mb-8">
                        <label class="form-label" for="tel">Telefono nr.</label>
                        <input
                            class="form-input"
                            type="tel"
                            name="tel"
                            id="tel"
                            v-model="form.tel"
                        />
                    </div>
                    <div class="w-full mb-8">
                        <label class="form-label" for="message">Žinutė</label>
                        <textarea
                            class="form-input !h-52 !p-4 resize-none"
                            name="message"
                            id="message"
                            v-model="form.message"
                            required
                        ></textarea>
                    </div>
                    <div
                        class="w-full absolute left-0 bottom-0 translate-y-[.125rem]"
                    >
                        <Button title="Siųsti" type="submit" class="w-full"
                            >Siųsti</Button
                        >
                    </div>
                </form>
                <div v-else class="text-center mt-16">
                    <p>Thank you! Your message has been sent successfully.</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchData } from "@/api";
import { useLoaderStore } from "@/stores/loaderStore";
import { API_BASE_URL } from "@/api";
import Hero from "@/components/Hero.vue";
import Button from "@/components/Button.vue";

const contactData = ref([]);
const form = ref({
    name: "",
    email: "",
    tel: "",
    message: "",
});

const mailSent = ref(false);
const loader = useLoaderStore();

onMounted(async () => {
    const response = await fetchData("/contact-page?populate=*");
    contactData.value = {
        title: response.data.HeroTitle,
        description: response.data.HeroDescription,
        image: response.data.HeroImage,
        cta: false,
    };

    loader.isLoading = false;

    window.dispatchEvent(new Event("resize"));
});

const submitHandler = async () => {
    try {
        // const res = await fetch(`${API_BASE_URL}/contact`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(form.value),
        // });

        // console.log("res", res);
        // if (!res.ok) {
        //     throw new Error("Failed to send message");
        // }

        console.log(form.value);
        alert("Message sent!");
        form.value = { name: "", email: "", tel: "", message: "" }; // Reset form
        mailSent.value = true;
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong");
    }
};
</script>
