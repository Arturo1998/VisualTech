<template>
  <div
    class="h-screen min-w-min flex flex-col bg-gradient-to-b from-cyan-700 via-sky-800 to-sky-500 text-center text-2xl text-white pt-6 items-center"
  >
    <h1 class="p-2 font-black">Bienvenido {{ nombreUsu }}</h1>

    <div class="w-3/4">
      <ul v-for="(sala, index) in salas" :key="index">
        <li class="bg-gray-400 mb-3 rounded-xl">{{ sala.espacio }}</li>
      </ul>
      <button class="w-2/4 bg-gray-400 rounded-xl"> + </button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onDameSalas } from "@/API/firebase";
import { ref } from "vue";
import { onMounted } from "vue";

onMounted(() => {
  dameSalas();
});

let salas = ref([]);

const dameSalas = async () => {
  await onDameSalas("SALAS", (docs) => {
    docs.forEach((doc) => {
      salas.value.push(doc.data());
    });
  });
};

const route = useRoute();
let nombreUsu = route.params.name;
</script>

<style scoped></style>
