import Calendar from "@/pages/calendar.vue";
import { createRouter, createWebHistory } from "vue-router";

function n(v: undefined | null | string | number | string[]) {
    if (Array.isArray(v)) v = v[0];
    if (v == null) return v;
    if (typeof v === "string") {
        if (v === "") {
            return undefined;
        }
        return parseInt(v);
    }
    return v;
}

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
