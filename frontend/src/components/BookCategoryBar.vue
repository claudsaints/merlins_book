<template>
  <div class="flex flex-wrap justify-center mb-4 gap-2">
    <button
      @click="onClickBemAvaliados"
      class="px-4 py-2 bg-green-500 text-white rounded-lg"
    >
      Bem Avaliados
    </button>
    <button
      @click="onClickCategoria('fiction', 'Ficção')"
      class="px-4 py-2 bg-light-purple text-white rounded-lg"
    >
      Ficção
    </button>
    <button
      @click="onClickCategoria('romance', 'Romance')"
      class="px-4 py-2 bg-pink-400 text-white rounded-lg"
    >
      Romance
    </button>
    <button
      @click="onClickCategoria('fantasy', 'Fantasia')"
      class="px-4 py-2 bg-indigo-400 text-white rounded-lg"
    >
      Fantasia
    </button>
    <button
      @click="onClickCategoria('history', 'História')"
      class="px-4 py-2 bg-gray-600 text-white rounded-lg"
    >
      História
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['bemAvaliados', 'categoria']);

const onClickBemAvaliados = () => emit('bemAvaliados');
const onClickCategoria = (cat: string, label: string) => emit('categoria', { cat, label });
</script>
