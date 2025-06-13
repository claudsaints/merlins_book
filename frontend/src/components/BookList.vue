<template>
  <div v-if="props.isLoading">
    <p class="text-center text-xl animate-pulse">Carregando livros...</p>
  </div>
  <div v-else-if="props.books.length > 0">
    <Card :books="props.books" />
  </div>
  <div v-else>
    <p class="text-center text-xl">Nenhum livro encontrado.</p>
  </div>
</template>

<script setup lang="ts">
import type { BookVolume } from '@/types/books';
import Card from './Card.vue';

const props = defineProps<{ books: BookVolume[]; isLoading: boolean }>();
</script>
