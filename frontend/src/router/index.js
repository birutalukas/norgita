import { createRouter, createWebHistory } from "vue-router";
import LanguageSelection from "../pages/LanguageSelection.vue";
import Home from "../pages/Home.vue";
import GameSelection from "../pages/GameSelection.vue";
import Flashcards from "../pages/games/FlashCards.vue";
import ServicePage from "../pages/ServicePage.vue";
import ContactPage from "../pages/ContactPage.vue";
const routes = [
    { path: "/", component: Home },
    { path: "/mokymai", component: GameSelection },
    { path: "/mokymai/flashcards", component: Flashcards },
    { path: "/paslaugos/:id", component: ServicePage }, // <--- dynamic service page
    { path: "/kontaktai", component: ContactPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
