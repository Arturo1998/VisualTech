<script setup>
import { RouterLink, RouterView } from "vue-router";
import MiCabecera from "./components/MiCabecera.vue";
</script>

<template>
  <MiCabecera titulo="VisualTech" />
  <router-link to="/"></router-link>
  <router-view />
</template>

<style scoped></style>
