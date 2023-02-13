<script setup>
import { RouterLink, RouterView } from "vue-router";
import MiCabecera from "./components/MiCabecera.vue";
</script>

<template>
  <MiCabecera titulo="VisualTech" />
  <router-view />
</template>

<style scoped></style>
