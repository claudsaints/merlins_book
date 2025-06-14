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



const update = async () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("Atualizando...");
      router.go(0);
      resolve();
    }, 10);
  });
};

const handleUpdate = async () => {
  try {
    await update();
  } catch (err) {
    console.error('Erro ao atualizar:', err);
  }
};

const handleAddBook = async (popId: string, book: BookVolume) => {
  try {
    await Books.saveBook(popId, book.id, book.volumeInfo.imageLinks?.thumbnail || '', book.volumeInfo.title);
    await handleUpdate();
  } catch (err) {
    console.error('Erro ao adicionar livro:', err);
  }
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
    <div v-for="book in books" :key="book.id" class="p-4 w-3/4 shadow-md flex flex-col items-center">
      <img v-if="book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail" :src="book.volumeInfo.imageLinks.thumbnail" class="h-48 w-auto object-cover rounded-md shadow-md" />
      <div v-else class="h-48 w-auto flex items-center justify-center bg-gray-200 rounded-md shadow-md text-gray-500">
        Sem imagem
      </div>
      <h3 class="text-lg font-medium text-center truncate overflow-hidden text-ellipsis max-w-full">
        {{ book.volumeInfo.title || 'Sem título' }}
      </h3>
      <button @click="handleAddBook(props.popId, book)"
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
