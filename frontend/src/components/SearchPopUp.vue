<script setup lang="ts">
import {  defineEmits } from 'vue';
import { BookVolume } from '@/types/books';



const emit = defineEmits(['close', 'addBook']);

// Função para fechar o pop-up
const closePopup = () => {
  emit('close');
};

// Função para adicionar livro ao clicar em "Adicionar"
const addBook = (book: BookVolume) => {
  emit('addBook', book);
};
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded-lg shadow-xl w-11/12 sm:w-96">
      <div class="mb-4">
        <input
          type="text"
          placeholder="Pesquisar livro..."
          class="w-full p-2 border rounded-md"
        />
      </div>
      <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="book in books" :key="book.id" class="card p-4 shadow-md flex flex-col items-center">
          <img
            v-bind:src="book.volumeInfo.imageLinks.thumbnail"
            class="h-48 w-auto object-cover rounded-md shadow-md"
          />
          <h4 class="text-center mt-2 truncate">{{ book.volumeInfo.title }}</h4>
          <button
            @click="addBook(book)"
            class="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Adicionar
          </button>
        </div>
      </div>
      <button
        @click="closePopup"
        class="mt-4 w-full bg-gray-500 text-white py-2 rounded"
      >
        Fechar
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Estilo do pop-up */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
