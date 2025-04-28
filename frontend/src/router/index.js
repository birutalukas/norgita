import { createRouter, createWebHistory } from "vue-router";
import LanguageSelection from "../views/LanguageSelection.vue";
import Home from "../views/Home.vue";
import GameSelection from "../views/GameSelection.vue";
import Flashcards from "../views/games/FlashCards.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/mokymai", component: GameSelection },
    { path: "/mokymai/flashcards", component: Flashcards },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
