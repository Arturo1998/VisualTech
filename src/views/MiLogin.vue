<template>
  <div
    class="h-screen min-w-min flex flex-col bg-gradient-to-b from-cyan-700 via-sky-800 to-sky-500 text-center text-2xl text-white pt-6 items-center"
  >
    <div class="flex flex-col w-56">
      <h1 class="p-2 font-black">INICIA SESIÓN</h1>
      <h2>Nombre</h2>
      <input
        v-model="nombreIn"
        class="border-2 border-emerald-500 text-black"
        type="text"
      />
      <h2>Contraseña</h2>
      <input
        v-model="paswdIn"
        class="border-2 border-emerald-500 text-black"
        type="password"
      />
      <button
        @click="singIn('USUARIOS', 'nombre', nombreIn)"
        class="bg-cyan-300 rounded-xl p-1 mt-4"
      >
        Log In
      </button>
    </div>
  </div>
</template>

<script setup>
import { dameDocs, dameDocsFiltro } from "@/API/firebase";
import { useRouter } from "vue-router";
import { ref } from "vue";

let nombreIn = ref("");
let paswdIn = ref("");
const router = useRouter();

const singIn = async (ref, nombre, valorNombre) => {
  const usuarios = await dameDocsFiltro(ref, nombre, valorNombre);
  usuarios.docs.map((el) => {
    let { nombre, paswd } = el.data();
    paswd == paswdIn.value
      ? router.push({
          name: "MiPrin",
          params: {
            saludo: "hola",
          },
        })
      : alert("Usuario o contraseña incorrecto");
  });
};
</script>

<style scoped>
button:hover {
  background-color: cadetblue;
}
</style>
