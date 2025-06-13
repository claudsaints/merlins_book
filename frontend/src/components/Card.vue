<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="props.books.length > 0">
    <h2 class="text-3xl font-semibold mb-6 text-center">Estante de Livros</h2>
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        <div
          v-for="book in props.books"
          :key="book.id"
          :id="book.id"
          class="p-4 shadow-lg transform  transition-all hover:scale-90 hover:shadow-xl flex flex-col items-center cursor-pointer"
          @click="goToBookView(book.id)"
        >
          <div class="flex justify-center mb-4">
            <img
              v-if="book.volumeInfo?.imageLinks?.thumbnail"
              :src="book.volumeInfo.imageLinks.thumbnail"
              class="h-64 w-auto object-cover  shadow-md"
              alt="Capa do livro"
            />
          </div>
          <h3 class="text-lg font-medium text-center truncate overflow-hidden text-ellipsis max-w-full">
            {{ book.volumeInfo?.title || 'Sem título' }}
          </h3>
        </div>
      </div>
    </div>
  </div>
  <div class="flex-1" v-else>
    <p>Carregando livros...</p>
  </div>
</template>
<script setup lang="ts">
import type { BookVolume } from '@/types/books';
import { useRouter } from 'vue-router';

const props = defineProps<{ books: BookVolume[] }>();
const router = useRouter();

const goToBookView = (bookId: string) => {
  router.push({ name: 'book-view', params: { id: bookId } });
};
</script>
