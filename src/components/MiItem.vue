<template>
  <div class="nombreDisp">
    {{ item.nombre }}
  </div>
  <div
    class="text-center bg-cyan-800 h-auto pt-4 pb-4 font-extrabold border-2 border-purple-300 mb-2 rounded-lg"
  >
    <p class="text-base text-white">Tipo: {{ item.tipo }}</p>
    <p v-if="item.tipo == 'Sensor'" class="text-base">
      Temperatura: {{ item.temperatura }}
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

/*
function cambiarEstado(item) {
  item == "on"
    ? actualizaValorDisp("DISPOSITIVOS", item.id, { estado: "on" })
    : actualizaValorDisp("DISPOSITIVOS", item.id, { estado: "off" });
}
*/

function cambiarEstado(item) {
  item.estado == "off"
    ? actualizaValorDisp("DISPOSITIVOS", item.id, { estado: "on" })
    : actualizaValorDisp("DISPOSITIVOS", item.id, { estado: "off" });
}

const borrar = (item) => {
  borraDisp("DISPOSITIVOS", item.id);
};
</script>

<style scoped>
.nombreDisp {
  background-color: rgb(108, 84, 214);
  text-align: center;
  width: 50%;
  margin: 0 auto;
  margin-top: 8px;
  border-radius: 0.5em;
  border: 1px solid yellowgreen;
}

.botonCambiar {
  background-color: cadetblue;
  border-radius: 50%;
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
  border-radius: 90%;
}

.botonEliminar:hover {
  background-color: rgb(206, 93, 73);
}
</style>
