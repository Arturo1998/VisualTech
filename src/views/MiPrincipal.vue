<template>
  <div class="contenedorPrincipal">
    <button
      @click="logOut()"
      class="text-sm h-auto w-auto hover:bg-red-400 bg-slate-500 p-2 rounded-md float-right mr-10"
    >
      Log Out
    </button>
    <h1 class="p-2 font-black mb-3">
      Bienvenido a su dashboard, {{ nombreUsu }}:
    </h1>

    <button
      class="w-1/4 bg-slate-500 rounded-xl hover:bg-slate-600 mb-5"
      @click="modalOn = true"
    >
      Crea una sala
    </button>
    <div class="contenedorLista">
      <ul
        class="bg-blue-900 pt-2 pb-2 bg-opacity-30 rounded-md"
        v-for="(sala, index) in salas"
        :key="index"
      >
        <div class="estiloListaSala">
          <li class="flex bg-slate-500 pl-16 pr-5">
            <h3 class="text-base text-center mt-1 w-11/12">
              {{ sala.espacio }}
            </h3>
            <button
              class="bg- mt-1 mr-2 bg-cyan-800 hover:bg-cyan-600 rounded-xl w-6 h-6 text-sm"
              @click="abrirModalDisp(sala.espacio)"
            >
              +
            </button>
            <button
              @click="borraSala(sala)"
              class="text-sm bg-red-500 hover:bg-red-400 rounded-xl w-6 h-6 mt-1 mb-0.5"
            >
              X
            </button>
          </li>

          <ul
            v-for="(dispositivo, index) in dispositivos.filter(
              (x) => x.sala === sala.espacio
            )"
            :key="index"
          >
            <li id="item">
              <MiItem :item="dispositivo" />
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
  <Teleport to="#modalSensor">
    <div v-if="modalSensorOn" class="modal-bg">
      <div class="contenedorModal">
        <div class="barra">
          <h1 class="text-base">Introduce los datos dispositivo</h1>
          <button @click="cerrarModal()">X</button>
        </div>
        <div class="contenido">
          <h1>Nombre</h1>
          <input type="text" v-model="nombreSensor" />
          <h1>Tipo</h1>
          <select
            name="tipo"
            id="tipo"
            class="bg-slate-500"
            v-model="tipoSensor"
          >
            <option value="Sensor">Sensor</option>
            <option value="Ejecutor">Ejecutor</option>
          </select>
        </div>
        <button @click="registraDispositivo()">aceptar</button>
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
  borraDisp,
} from "@/API/firebase";
import { onMounted, ref } from "vue";
import MiItem from "../components/MiItem.vue";

let salas = ref([]);

let dispositivos = ref([]);

const modalOn = ref(false);

const nombreSensor = ref("");
const tipoSensor = ref("");

const route = useRoute();
const router = useRouter();
const nombreUsu = route.params.name;
const nombreSala = ref("");
const modalSensorOn = ref(false);
const salaActual = ref("");

onMounted(() => {
  dameSalas();
  dameDispositivos();
});

const dameSalas = () => {
  onDameSalas("SALAS", (docs) => {
    salas.value = [];
    docs.forEach((doc) => {
      salas.value.push({ id: doc.id, ...doc.data() });
    });
  });
};

const registraSala = () => {
  if (nombreSala.value != "") {
    anadeSala("SALAS", { espacio: nombreSala.value, usuario: nombreUsu });
    nombreSala.value = "";
  } else {
    alert("Debe incluir un nombre para la sala");
  }
};

const dameDispositivos = () => {
  onDameDispositivos("DISPOSITIVOS", (docs) => {
    dispositivos.value = [];
    docs.forEach((doc) => {
      dispositivos.value.push({ id: doc.id, ...doc.data() });
    });
  });
};

function abrirModalDisp(sala) {
  modalSensorOn.value = true;
  salaActual.value = sala;
}

const registraDispositivo = async () => {
  if (nombreSensor.value == "") {
    alert("Debe elegir el nombre del dispositivo");
  } else if (tipoSensor.value == "") {
    alert("Debe elegir el tipo de dispositivo");
  } else {
    if (tipoSensor.value == "Sensor") {
      await anadeDisp("DISPOSITIVOS", {
        nombre: nombreSensor.value,
        usuario: nombreUsu,
        tipo: tipoSensor.value,
        sala: salaActual.value,
        temperatura: "-",
      });
      nombreSensor.value = "";
      tipoSensor.value = "";
    } else {
      await anadeDisp("DISPOSITIVOS", {
        nombre: nombreSensor.value,
        usuario: nombreUsu,
        tipo: tipoSensor.value,
        sala: salaActual.value,
        estado: "on",
      });
      nombreSensor.value = "";
      tipoSensor.value = "";
    }
  }
};

const cerrarModal = () => {
  modalOn.value = false;
  modalSensorOn.value = false;
};

const logOut = () => {
  router.push({ path: "/" });
};

const borraSala = (sala) => {
  if (confirm("¿Quiere borrar la sala?")) {
    borraDisp("SALAS", sala.id);
    dispositivos.value.map((x) => {
      x.sala == sala.espacio ? borraDisp("DISPOSITIVOS", x.id) : "";
    });
  }
};
</script>

<style scoped>
.contenedorLista {
  margin: 0 auto;
  width: 75%;
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
.estiloListaSala {
  padding: 0px 10px 0px 10px;
  margin-bottom: 5px;
}
</style>
