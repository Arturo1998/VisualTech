<template>
  <div
    class="h-screen min-w-min flex flex-col bg-gradient-to-b from-cyan-700 via-sky-800 to-sky-500 text-center text-2xl text-white pt-6 items-center"
  >
    <h1 class="p-2 font-black">Dash</h1>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute();


//console.log(route.query.obj.value);
</script>

<style scoped></style>
