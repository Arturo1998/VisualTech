import { createRouter, createWebHistory } from "vue-router";
import MiLogin from "../views/MiLogin.vue";
import MiPrincipal from "../views/MiPrincipal.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "MiLogin",
      component: MiLogin,
      props: true,
    },
    {
      path: "/principal",
      name: "MiPrincipal",
      component: MiPrincipal,
      props: true,
    },
  ],
});

export default router;
