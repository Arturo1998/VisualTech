<template>
  <div
    title="Más información"
    @click="cambiarTemperatura(item.id)"
    class="nombreDisp"
  >
    {{ item.nombre }}
  </div>
  <div
    class="text-center bg-stone-600 h-auto pt-4 pb-4 font-extrabold border-2 mb-2 rounded-lg"
  >
    <p class="text-base text-white">Tipo: {{ item.tipo }}</p>
    <p v-if="item.tipo == 'Sensor'" class="text-base">
      Temperatura: {{ item.temperatura }} ºC
    </p>
    <div v-if="item.tipo == 'Ejecutor'">
      <p class="text-base">Estado: {{ item.estado }}</p>
      <button @click="cambiarEstado(item)" class="botonCambiar">
        Cambiar estado
      </button>
    </div>
    <button class="botonEliminar" @click="borrar(item)">Eliminar</button>
  </div>
</template>

<script setup>
import { actualizaValorDisp, borraDisp } from "@/API/firebase";
const props = defineProps({
  item: Object,
});

function cambiarEstado(item) {
  item.estado == "off"
    ? actualizaValorDisp("DISPOSITIVOS", item.id, { estado: "on" })
    : actualizaValorDisp("DISPOSITIVOS", item.id, { estado: "off" });
}

const borrar = (item) => {
  if (confirm("¿Quiere borrar el dispositivo?")) {
    borraDisp("DISPOSITIVOS", item.id);
  }
};

const cambiarTemperatura = (id) => {
  window.open(`http://localhost:5174/${id}`);
};
</script>

<style scoped>
.nombreDisp {
  background-color: rgb(120, 115, 95);
  text-align: center;
  width: 50%;
  margin: 0 auto;
  margin-top: 8px;
  border-radius: 0.5em;
  cursor: pointer;
}

.botonCambiar {
  background-color: rgb(133, 126, 104);
  border-radius: 30px;
  width: 50%;
  margin-top: 10px;
}
.botonCambiar:hover {
  background-color: rgb(133, 167, 168);
}

.botonEliminar {
  margin-top: 10px;
  background-color: rgb(212, 71, 45);
  width: 50%;
  border-radius: 30px;
}

.botonEliminar:hover {
  background-color: rgb(206, 93, 73);
}
</style>
