<script setup lang="ts">
import type { BookVolume } from '@/types/books';
import { inject } from 'vue';
import { useRouter } from 'vue-router';


const books = inject<BookVolume[]>('books', []);


const router = useRouter();
console.log(books)

const goToBookView = (bookId: string) => {
  router.push({ name: 'book-view', params: { id: bookId } });
};
</script>

<template>
  <div v-if="books.length > 0">
    <h2 class="text-3xl font-semibold mb-6 text-center">Estante de Livros</h2>
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        <div
          v-for="book in books"
          :key="book.id"
          :id="book.id"
          class="card p-4 shadow-lg transform transition-all hover:scale-90 hover:shadow-xl flex flex-col items-center cursor-pointer"
          @click="goToBookView(book.id)"
        >

          <div class="flex justify-center mb-4">
            <img
              v-bind:src="book.volumeInfo.imageLinks.thumbnail"
              class="h-64 w-auto object-cover rounded-md shadow-md"
            />
          </div>

          <h3 class="text-lg font-medium text-center truncate overflow-hidden text-ellipsis max-w-full">
            {{ book.volumeInfo.title }}
          </h3>
        </div>
      </div>
    </div>
  </div>
  <div class="flex-1" v-else>
    <p>Carregando livros...</p>
  </div>
</template>
