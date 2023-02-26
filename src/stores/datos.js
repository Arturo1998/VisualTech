import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDatosStore = defineStore("datos", () => {
  const nombreAddSala = ref("");
  const cogerId = computed(() => idDispositivo.value);
  const cogerNombreSala = (nuevoNombre) => {
    nombreAddSala.value = nuevoNombre;
  };

  return { idDispositivo, cogerId };
});
