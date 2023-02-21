<template>
  <div class="contenedorPrincipal">
    <button @click="logOut()" class="text-sm ml-96 h-auto w-auto bg-slate-300">
      Log Out
    </button>
    <h1 class="p-2 font-black mb-3">
      Bienvenido a su dashboard, {{ nombreUsu }}:
    </h1>

    <button
      class="w-1/4 bg-gray-400 rounded-xl hover:bg-slate-500 mb-5"
      @click="modalOn = true"
    >
      Crea una sala
    </button>
    <div class="contenedorLista">
      <ul v-for="(sala, index) in salas" :key="index">
        <div class="border-2 mb-3">
          <li class="bg-gray-400 flex">
            <h3 class="text-base text-left ml-5">
              {{ sala.espacio }}
            </h3>
            <button class="text-sm bg-red-500 rounded-xl w-6 h-6 mt-0.5 mb-0.5">
              X
            </button>
          </li>

          <ul
            v-for="(dispositivo, index) in dispositivos.filter(
              (x) => x.sala === sala.espacio
            )"
            :key="index"
          >
            <button>Xas</button>
            <li id="item">
              <MiItem :item="dispositivo" :sala="sala" :usuario="nombreUsu" />
            </li>
          </ul>
        </div>
      </ul>
    </div>
  </div>
  <Teleport to="#modalSala">
    <div v-if="modalOn" class="modal-bg">
      <div class="contenedorModal">
        <div class="barra">
          <h1 class="">Introduce el nombre de la sala</h1>
          <button @click="cerrarModal()">X</button>
        </div>
        <div class="contenido">
          <h1>Nobre Sala</h1>
          <input type="text" v-model="nombreSala" />
        </div>
        <button @click="registraSala()">Agregar</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import {
  onDameSalas,
  anadeSala,
  onDameDispositivos,
  anadeDisp,
} from "@/API/firebase";
import { onMounted, ref } from "vue";
import MiItem from "../components/MiItem.vue";

let salas = ref([]);
let dispositivos = ref([]);
const modalOn = ref(false);
const haySala = ref(false);

const route = useRoute();
const router = useRouter();
const nombreUsu = route.params.name;
let nombreSala = ref("");

function log(obj) {
  console.log(obj);
}

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
  anadeSala("SALAS", { espacio: nombreSala.value, usuario: nombreUsu });
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

.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
}

.contenedorModal {
  background-color: rgb(18, 121, 168);
  color: white;
  width: 25em;
}

.contenedorModal input {
  color: black;
}

.contenedorModal button {
  width: 25em;
  margin-top: 10px;
  background-color: darkgrey;
}

.contenedorModal button:hover {
  background-color: rgb(139, 139, 139);
}

.barra {
  text-align: end;
  margin-right: 10px;
  display: flex;
}

.barra > button {
  background-color: red;
  border-radius: 50%;
  width: 1.5em;
  margin-top: 2px;
  margin-left: 4em;
}

.barra h1 {
  font-size: 20px;
  margin-left: 5px;
}

.contenido {
  margin-top: 10px;
  display: flex;
}

.contenido h1 {
  margin-right: 10px;
  margin-left: 10px;
}

.anadirDispositivo {
  width: 100%;
  background-color: darkgrey;
}

.anadirDispositivo:hover {
  background-color: rgb(139, 139, 139);
}
</style>
