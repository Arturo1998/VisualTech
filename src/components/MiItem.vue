<template>
  <div class="bg-slate-300 mt-2 w-2/4 rounded-md">
    {{ item.nombre }}
  </div>
  <div
    class="text-center bg-cyan-800 h-auto pt-4 pb-4 font-extrabold border-2 mb-2 rounded-lg"
  >
    <p class="text-base text-white">Tipo: {{ item.tipo }}</p>
    <p v-if="item.tipo == 'Sensor'" class="text-base">
      Temperatura: {{ item.temperatura }}
    </p>
    <div v-if="item.tipo == 'Ejecutor'">
      <p class="text-base">Estado: {{ item.estado }}</p>
      <input type="checkbox" />
    </div>
  </div>
  <button @click="modalSensorOn = true" class="anadirDispositivo">
    Agregar
  </button>
  <Teleport to="#modalSensor">
    <div v-if="modalSensorOn" class="modal-bg">
      <div class="contenedorModal">
        <div class="barra">
          <h1 class="text-base">Introduce los datos dispositivo</h1>
          <button @click="cerrarModal()">X</button>
        </div>
        <div class="contenido">
          <h1>Nobre</h1>
          <input type="text" v-model="nombreSensor" />
          <h1>Tipo</h1>
          <select
            name="tipo"
            id="tipo"
            class="bg-slate-500"
            v-model="tipoSensor"
          >
            <option value="Sensor">Sensor</option>
            <option value="Sensor">Ejecutor</option>
          </select>
          <button @click="registraDispositivo()">aceptar</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { anadeDisp } from "../API/firebase";
import { ref } from "vue";
const props = defineProps({
  item: Object,
  sala: Object,
  usuario: String,
});

const modalSensorOn = ref(false);
let nombreSensor = ref("");
let tipoSensor = ref("");

const cerrarModal = () => {
  modalSensorOn.value = false;
};

const registraDispositivo = async () => {
  await anadeDisp("DISPOSITIVOS", {
    nombre: nombreSensor.value,
    usuario: props.usuario,
    tipo: tipoSensor.value,
    sala: props.sala.espacio,
    temperatura: "30",
  });
};
</script>

<style scoped>
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
</style>
