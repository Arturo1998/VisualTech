import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDatosStore = defineStore("datos", () => {
  const idDispositivo = ref("");
  const cogerId = computed(() => idDispositivo.value);

  return { idDispositivo, cogerId };
});
