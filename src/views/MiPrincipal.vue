<template>
  <div class="contenedorPrincipal">
    <div v-if="modalOn == true">
      <div class="contenedorModal">
        <ModalAnadir @cerrar="cerrarModal()" />
      </div>
    </div>
    <button @click="logOut()" class="text-sm ml-96 h-auto w-auto bg-slate-300">
      Log Out
    </button>
    <h1 class="p-2 font-black mb-3">
      Bienvenido a su dashboard, {{ nombreUsu }}:
    </h1>

    <div class="contenedorLista">
      <ul v-for="(sala, index) in salas" :key="index">
        <div class="border-2 mb-3 mr-3">
          <li class="bg-gray-400 flex">
            <h3 class="text-base text-left ml-5">
              {{ sala.espacio }}
            </h3>
            <button class="ml-24 text-sm bg-red-500 rounded-xl w-6 h-5 mt-0.5">
              X
            </button>
          </li>

          <ul
            v-for="(dispositivo, index) in dispositivos.filter(
              (x) => x.sala === sala.espacio
            )"
            :key="index"
          >
            <li>
              <MiItem :item="dispositivo" />
            </li>
          </ul>
        </div>
      </ul>
    </div>
    <button
      class="w-1/4 bg-gray-400 rounded-xl hover:bg-slate-500"
      @click="modalOn = true"
    >
      Crea una sala
    </button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onDameSalas, anadeSala, onDameDispositivos } from "@/API/firebase";
import { onMounted, ref, watch } from "vue";
import MiItem from "../components/MiItem.vue";
import ModalAnadir from "../components/ModalAnadir.vue";

let salas = ref([]);
let dispositivos = ref([]);
const modalOn = ref(false);

const route = useRoute();
const router = useRouter();
let nombreUsu = route.params.name;
const emit = defineEmits(["cerrar"]);

onMounted(() => {
  dameSalas();
  dameDispositivos();
});
/*
beforeDestroy(() => {
 document.body.classList.remove('contenedorModal')
  from-cyan-700 via-sky-800 to-sky-500 text-center text-2xl text-white

  
})

watch: {
  watch(modalOn, (newX) => {
    const contenedor = document.getElementsByClassName("contenedorPrincipal");
    contenedor.style.position = "fixed";
  });
}
   
  
*/

const dameSalas = () => {
  onDameSalas("SALAS", (docs) => {
    docs.forEach((doc) => {
      salas.value.push({ ...doc.data() });
    });
  });
};

const registraSala = () => {
  salas.value = [];
  anadeSala("SALAS", { espacio: "1", usuario: nombreUsu });
};

const dameDispositivos = () => {
  onDameDispositivos("DISPOSITIVOS", (docs) => {
    docs.forEach((doc) => {
      dispositivos.value.push({ ...doc.data() });
      console.log(doc.data());
    });
  });
};

const cerrarModal = () => {
  modalOn.value = false;
};

const logOut = () => {
  router.push({ path: "/" });
};
</script>

<style scoped>
.contenedorLista {
  margin: 0 auto;
  width: 50%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.contenedorModal {
  overflow: hidden;
}

.contenedorPrincipal {
  min-height: 100%;
  min-width: 100%;
  background: linear-gradient(
    180deg,
    rgb(14 116 144) 0%,
    rgb(7 89 133) 35%,
    rgb(14 165 233) 100%
  );
  text-align: center;
  color: azure;
}
</style>
