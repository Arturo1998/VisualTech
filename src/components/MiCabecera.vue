<template>
  <div class="text-center bg-cyan-800 h-16 pt-4 font-extrabold">
    <h1 class="text-3xl text-white">{{ titulo }}</h1>
  </div>
</template>

<script setup>
const props = defineProps({
  titulo: String,
});
</script>

<style scoped></style>
