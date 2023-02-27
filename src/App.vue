<script setup>
import { RouterView } from "vue-router";
import MiCabecera from "./components/MiCabecera.vue";
</script>

<template>
  <MiCabecera titulo="GestiónTech" />
  <router-view />
</template>

<style scoped></style>
