<template>
    <div class="w-full" id="contact-me">
        <form
            @submit.prevent="submitHandler"
            class="relative block min-w-full mt-8 md:mt-16 lg:my-0 border border-theme-blue rounded-xl p-8 pb-16"
            v-if="!mailSent"
        >
            <div class="w-full mb-8 relative">
                <label class="form-label" for="name">{{ $t("name") }}</label>
                <input
                    class="form-input"
                    type="text"
                    name="name"
                    id="name"
                    v-model="form.name"
                />
                <p
                    v-if="errors.name"
                    class="absolute top-0 right-0 text-red-500"
                >
                    {{ errors.name }}
                </p>
            </div>
            <div class="w-full mb-8 relative">
                <label class="form-label" for="">{{ $t("email") }}</label>
                <input
                    class="form-input"
                    type="email"
                    name="email"
                    id="email"
                    v-model="form.email"
                />
                <p
                    v-if="errors.email"
                    class="absolute top-0 right-0 text-red-500 text-red-500"
                >
                    {{ errors.email }}
                </p>
            </div>
            <div class="w-full mb-8 relative">
                <label class="form-label" for="phone">{{ $t("telnum") }}</label>
                <input
                    class="form-input"
                    type="phone"
                    name="phone"
                    id="phone"
                    v-model="form.phone"
                />
                <p
                    v-if="errors.phone"
                    class="absolute top-0 right-0 text-red-500 text-red-500"
                >
                    {{ errors.phone }}
                </p>
            </div>
            <div class="w-full mb-8 relative">
                <label class="form-label" for="message">{{
                    $t("message")
                }}</label>
                <textarea
                    class="form-input !h-52 !p-4 resize-none"
                    name="message"
                    id="message"
                    v-model="form.message"
                ></textarea>
                <p
                    v-if="errors.message"
                    class="absolute top-0 right-0 text-red-500 text-red-500"
                >
                    {{ errors.message }}
                </p>
            </div>
            <div
                class="w-[calc(100%+.25rem)] absolute -left-[.125rem] bottom-0 translate-y-[.0625rem]"
            >
                <Button :title="$t('send')" type="submit" class="w-full">{{
                    $t("send")
                }}</Button>
            </div>
        </form>

        <div v-else class="pt-6">
            <h2 class="text-center text-theme-blue text-[1.5rem]">
                {{ $t("thankYou") }}
                <br />
                {{ $t("contactSuccess") }}
            </h2>
        </div>

        <div class="flex justify-end">
            <Brand dark="true" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import Button from "@/components/Button.vue";
import Brand from "@/components/Brand.vue";
import { API_BASE_URL } from "@/api";
import { lenis } from "@/scripts/smoothScroll.js";
const props = defineProps({
    pageTitle: String,
});

const form = ref({
    title: props.pageTitle,
    name: "",
    email: "",
    phone: "",
    message: "",
});
const errors = reactive({});

const mailSent = ref(false);

function validateForm() {
    const data = form.value;

    errors.name = data.name ? "" : "Name is required.";
    errors.email = /\S+@\S+\.\S+/.test(data.email) ? "" : "Invalid email.";
    errors.phone = /^[0-9]+$/.test(data.phone)
        ? ""
        : "Phone must be digits only.";
    errors.message = data.message ? "" : "Message is required.";

    return Object.values(errors).every((err) => !err);
}

const submitHandler = async () => {
    if (!validateForm()) return;

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

        form.value = {
            title: props.pageTitle,
            name: "",
            email: "",
            phone: "",
            message: "",
        }; // Reset form
        mailSent.value = true;

        lenis.scrollTo(document.getElementById("contact-me"), {
            offset: -130,
            duration: 0.4,
            easing: (t) =>
                t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        });
    } catch (error) {
        console.error("Error:", error);
    }
};
</script>
