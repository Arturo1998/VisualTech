<template>
  <div
    class="h-screen min-w-min flex flex-col bg-gradient-to-b from-stone-900 via-stone-700 to-stone-600 text-center text-2xl text-white pt-6 items-center"
  >
    <form class="flex flex-col w-56" @submit.prevent="logIn()">
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
      <button type="submit" class="bg-stone-500 rounded-xl p-1 mt-4">
        Log In
      </button>

      <RouterLink to="/Registro">¿No tienes cuenta?</RouterLink>
    </form>
  </div>
</template>

<script setup>
import { onLogIn } from "@/API/firebase";
import { useRouter } from "vue-router";
import { ref } from "vue";

let nombreIn = ref("");
let paswdIn = ref("");
const router = useRouter();

const logIn = () => {
  onLogIn("USUARIOS", nombreIn.value, (docs) => {
    docs.forEach((doc) => {
      doc.data().paswd == paswdIn.value
        ? router.push({
            name: "Principal",
            params: { name: doc.data().nombre },
          })
        : alert("Nombre o contraseña incorrectos");
    });
  });
};
</script>

<style scoped>
button:hover {
  background-color: rgb(116, 110, 84);
}
</style>
