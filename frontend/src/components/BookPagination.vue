<template>
  <div v-if="books.length > 0 && totalPages > 1" class="flex flex-row items-center justify-center gap-4 my-8">
    <button
      class="px-4 py-2 rounded-lg bg-light-purple text-white font-bold shadow-md transition hover:bg-dark-purple disabled:opacity-50"
      :disabled="page === 1"
      @click="$emit('change', page - 1)"
    >
      ◀ Anterior
    </button>
    <span class="text-lg font-semibold text-dark-purple">
      Página {{ page }} de {{ totalPages }}
    </span>
    <button
      class="px-4 py-2 rounded-lg bg-light-purple text-white font-bold shadow-md transition hover:bg-dark-purple disabled:opacity-50"
      :disabled="page === totalPages"
      @click="$emit('change', page + 1)"
    >
      Próxima ▶
    </button>
  </div>
</template>

<script setup lang="ts">
import type { BookVolume } from '@/types/books';

defineProps<{ page: number; totalPages: number; books: BookVolume[] }>();
</script>
