<template>
  <div class="flex flex-col sm:flex-row items-center justify-center mb-5 gap-2 sm:gap-0">
    <input
      v-model="modelValue"
      @keyup.enter="onSearch"
      type="text"
      class="px-4 py-2 border  rounded-lg w-full sm:w-80 text-black"
      placeholder="Pesquise por livros..."
    />
    <button
      @click="onSearch"
      class="sm:ml-2 px-4 py-2 btn text-white rounded-lg w-full sm:w-auto mt-2 sm:mt-0"
    >
      Pesquisar
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['search']);
const modelValue = defineModel<string>();
const onSearch = () => emit('search');
</script>
