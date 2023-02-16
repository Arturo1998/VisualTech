import { createRouter, createWebHistory } from "vue-router";
import MiLogin from "../views/MiLogin.vue";
import MiPrincipal from "../views/MiPrincipal.vue";
import MiSingUp from "../views/MiSingUp.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "MiLogin",
      component: MiLogin,
    },
    {
      path: "/principal/:name",
      name: "Principal",
      component: MiPrincipal,
      params: true,
    },
    {
      path: "/registro",
      name: "Registro",
      component: MiSingUp,
    },
  ],
});

export default router;
