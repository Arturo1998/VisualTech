<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import MiCabecera from "./components/MiCabecera.vue";
import MiLogin from "./views/MiLogin.vue";
</script>

<template>
  <MiCabecera titulo="VisualTech" />
  <router-link to="/"></router-link>
  <router-view />
</template>

<style scoped></style>
