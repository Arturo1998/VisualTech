<template>
  <div class="bg-slate-300 mt-2 w-2/4 rounded-md">
    {{ item.nombre }}
  </div>
  <div
    class="text-center bg-cyan-800 h-auto pt-4 pb-4 font-extrabold border-2 mb-2 rounded-lg"
  >
    <p class="text-base text-white">Tipo: {{ item.tipo }}</p>
    <p v-if="item.tipo == 'sensor'" class="text-base">
      Temperatura: {{ item.temperatura }}
    </p>
    <div v-if="item.tipo == 'ejecutor'">
      <p class="text-base">Estado: {{ item.estado }}</p>
      <input type="checkbox" />
    </div>
  </div>
  <div>
    <button class="anadirDispositivo" @click="clickAgregar()">
      Agregar Dispositivo
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
  sala: Object,
});

const emit = defineEmits(["abrirModal"]);

function clickAgregar() {
  emit("abrirModal");
}
</script>

<style scoped>
.anadirDispositivo {
  width: 100%;
  background-color: darkgrey;
}

.anadirDispositivo:hover {
  background-color: rgb(139, 139, 139);
}
</style>
