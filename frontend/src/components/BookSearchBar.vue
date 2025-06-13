<template>
  <div class="text-center mb-5">
    <input
      v-model="modelValue"
      @keyup.enter="onSearch"
      type="text"
      class="px-4 py-2 border rounded-lg w-80 text-black"
      placeholder="Pesquise por livros..."
    />
    <button
      @click="onSearch"
      class="ml-2 px-4 py-2 btn text-white rounded-lg"
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
