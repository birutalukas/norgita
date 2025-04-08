import { createRouter, createWebHistory } from "vue-router";
import LanguageSelection from "../views/LanguageSelection.vue";
import GameSelection from "../views/GameSelection.vue";
import Flashcards from "../views/games/FlashCards.vue";

const routes = [
    { path: "/", component: LanguageSelection },
    { path: "/games", component: GameSelection },
    { path: "/game/flashcards", component: Flashcards },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
