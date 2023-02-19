<template>
  <div
    class="text-center bg-cyan-800 h-auto pt-4 pb-4 font-extrabold border-2 mt-2 mb-2 rounded-lg"
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
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>

<style scoped></style>
