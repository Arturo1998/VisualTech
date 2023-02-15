import { createRouter, createWebHistory } from "vue-router";
import MiLogin from "../views/MiLogin.vue";
import MiPrincipal from "../views/MiPrincipal.vue";
import MiDashboard from "../views/MiDashboard.vue";
import Miconfiguracion from "../views/MiConfiguracion.vue"

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
      path: "/principal/dashboard",
      name: "Dashboard",
      component: MiDashboard,
    },
    {
      path: "/principal/configuracion",
      name: "Configuracion",
      component: Miconfiguracion,
    },
  ],
});

export default router;
