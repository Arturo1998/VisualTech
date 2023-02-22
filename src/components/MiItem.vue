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
      <button @click="cambiarEstado(item)">Cambiar estado</button>
    </div>
  </div>
</template>

<script setup>
import { actualizaValorDisp } from "@/API/firebase";
const props = defineProps({
  item: Object,
});

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
</style>
