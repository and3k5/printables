import Calendar from "@/components/calendar.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/calendar/:year?/:month?",
            component: Calendar,
            name: "calendar",
            props(to) {
                return {
                    year: n(to.params.year) ?? new Date().getFullYear(),
                    month: n(to.params.month) ?? new Date().getMonth() + 1,
                };
            },
        },
    ],
});

export default router;
