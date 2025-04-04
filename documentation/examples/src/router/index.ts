import { createRouter, createWebHistory } from "vue-router";
import buiDocsRoutes from "./routes";
// route level code-splitting
// this generates a separate chunk (About.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: "text-primary",
  routes: [
    {
      path: "/",
      name: "app",
      component: () => import("../App.vue"),
    },
    buiDocsRoutes,
  ],
});

export default router;
