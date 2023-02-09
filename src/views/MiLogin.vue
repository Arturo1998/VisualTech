<template>
  <div
    class="h-screen min-w-min flex flex-col bg-gradient-to-b from-cyan-700 via-sky-800 to-sky-500 text-center text-2xl text-white pt-6 items-center"
  >
    <div class="flex flex-col w-56">
      <h1 class="p-2 font-black">INICIA SESIÓN</h1>
      <h2>Nombre</h2>
      <input class="border-2 border-emerald-500 text-black" type="text" />
      <h2>Contraseña</h2>
      <input class="border-2 border-emerald-500 text-black" type="text" />
      <button class="bg-cyan-300 rounded-xl p-1 mt-4" @click="login">
        Log In
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const route = useRouter();
const login = () => {
  route.push({ name: "MiPrincipal" });
};
</script>

<style scoped>
button:hover {
  background-color: cadetblue;
}
</style>
