import { createRouter, createWebHistory } from "vue-router";
import { useLoaderStore } from "../stores/loaderStore";
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
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            // Scroll to element with matching ID
            return {
                el: to.hash,
                behavior: "smooth",
            };
        } else {
            return { top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    const loader = useLoaderStore();
    // Only set loading if the path actually changed (not just the hash)
    if (to.path !== from.path) {
        loader.isLoading = true;
    }
    next();
});

export default router;
