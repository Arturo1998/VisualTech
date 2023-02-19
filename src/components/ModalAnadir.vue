<template>
  <div class="contenedor">
    <button @click="$emit('cerrar')">X</button>
    <div>Hola</div>
  </div>
</template>

<script setup>
const emit = defineEmits(["cerrar"]);
</script>

<style scoped>
.contenedor {
  position: fixed;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: rgb(46, 100, 124, 0.5);
}
</style>
