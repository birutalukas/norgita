<template>
    <div>
        <form
            @submit.prevent="submitHandler"
            class="relative block w-full lg:max-w-[48rem] mx-auto mt-8 md:mt-16 border border-theme-blue rounded-xl p-8 pb-16"
            v-if="!mailSent"
        >
            <div class="w-full mb-8">
                <label class="form-label" for="name">{{ $t("name") }}</label>
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
                <label class="form-label" for="">{{ $t("email") }}</label>
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
                <label class="form-label" for="tel">{{ $t("telnum") }}</label>
                <input
                    class="form-input"
                    type="tel"
                    name="tel"
                    id="tel"
                    v-model="form.tel"
                />
            </div>
            <div class="w-full mb-8">
                <label class="form-label" for="message">{{
                    $t("message")
                }}</label>
                <textarea
                    class="form-input !h-52 !p-4 resize-none"
                    name="message"
                    id="message"
                    v-model="form.message"
                    required
                ></textarea>
            </div>
            <div class="w-full absolute left-0 bottom-0 translate-y-[.125rem]">
                <Button :title="$t('send')" type="submit" class="w-full">{{
                    $t("send")
                }}</Button>
            </div>
        </form>
        <div v-else class="text-center mt-16">
            <p>{{ $t("contactSuccess") }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Button from "@/components/Button.vue";
import { API_BASE_URL } from "@/api";

const props = defineProps({
    pageTitle: String,
});

const form = ref({
    title: props.pageTitle,
    name: "",
    email: "",
    tel: "",
    message: "",
});

const mailSent = ref(false);

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

        form.value = { name: "", email: "", tel: "", message: "" }; // Reset form
        mailSent.value = true;
    } catch (error) {
        console.error("Error:", error);
    }
};
</script>
