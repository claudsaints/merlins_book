<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { BookVolume } from '@/types/books';
import { defineProps,  reactive, ref } from 'vue';
import { GoogleBooks } from '../services/google';
import { Books } from '@/services/books';
import router from '@/router';

const props = defineProps({
  popId: { type: String, required: true }
});



const update = () => {
  setTimeout(() => {
    console.log("Atualizando...");
    router.go(0);
  }, 10);
};

const books = reactive<BookVolume[]>([]);
const searchQuery = ref('');

const pesquisarLivros = async () => {
  try {
    const result = await GoogleBooks.pesquisarPorQuery(searchQuery.value);
    if (Array.isArray(result.items)) {
      books.length = 0;
      books.push(...result.items);
    } else {
      console.error("Erro: result.items não é um array", result);
    }
  } catch (err) {
    console.error("Erro ao buscar livros:", err);
  }

};

</script>

<template>
  <div class="mb-4 flex text-black">
    <input v-model="searchQuery" @keyup.enter="pesquisarLivros" type="text" placeholder="Pesquisar livro..."
      class="w-full p-2 border rounded-md" />
    <button @click="pesquisarLivros" class="ml-2 px-4 py-2 btn text-white rounded-lg">
      Pesquisar
    </button>
  </div>
  <div class="mb-4 flex h-3/4  gap-4 flex-col overflow-scroll items-center">
    <div v-for="book in books" :key="book.id" class="card p-4 w-3/4 shadow-md flex flex-col items-center">
      <img v-bind:src="book.volumeInfo.imageLinks.thumbnail" class="h-48 w-auto object-cover rounded-md shadow-md" />
      <h3 class="text-lg font-medium text-center truncate overflow-hidden text-ellipsis max-w-full">{{
        book.volumeInfo.title }}</h3>
      <button @click="Books.saveBook(props.popId, book.id, book.volumeInfo.imageLinks.thumbnail, book.volumeInfo.title),update()"
        class="mt-2 bg-green-500 text-white py-2 px-4 rounded">
        Adicionar
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
