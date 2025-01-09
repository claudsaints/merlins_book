<script setup lang="ts">
import Card from '@/components/Card.vue';
import Header from '@/components/Header.vue';
import { provide, reactive, watchEffect, ref } from 'vue';
import { GoogleBooks } from '../services/google';
import type { BookVolume } from '@/types/books';


const books = reactive<BookVolume[]>([]);
const searchQuery = ref('');
const props = { isTrue: true};


const pesquisarLivros = async () => {
  if (searchQuery.value.trim() === '') {

    await buscarLivrosPopulares();
  } else {
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
  }
};


const buscarLivrosPopulares = async () => {
  const result = await GoogleBooks.buscarLivrosPopulares();
  if (Array.isArray(result.items)) {
    books.length = 0;
    books.push(...result.items);
  }
};


const buscarLivrosBemAvaliados = async () => {
  const result = await GoogleBooks.buscarLivrosBemAvaliados();
  if (Array.isArray(result.items)) {
    books.length = 0;
    books.push(...result.items);
  }
};


const buscarLivrosGratuitos = async () => {
  const result = await GoogleBooks.buscarLivrosGratuitos();
  if (Array.isArray(result.items)) {
    books.length = 0;
    books.push(...result.items);
  }
};



watchEffect(() => {
  buscarLivrosPopulares();
});


provide('books', books);
</script>

<template>
  <Header v-bind="props"></Header>

  <main class="flex-1 mt-5">
    <!-- Barra de Pesquisa -->
    <div class="text-center mb-5">
      <input
        v-model="searchQuery"
        @keyup.enter="pesquisarLivros"
        type="text"
        class="px-4 py-2 border rounded-lg w-80"
        placeholder="Pesquise por livros..."
      />
      <button
        @click="pesquisarLivros"
        class="ml-2 px-4 py-2 btn text-white rounded-lg"
      >
        Pesquisar
      </button>
    </div>

    <!-- Seção de Livros Populares -->
    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-4 text-center">Livros Populares</h2>
      <div class="flex justify-center mb-4">
        <button
          @click="buscarLivrosPopulares"
          class="px-4 py-2 bg-yellow-500 text-white rounded-lg"
        >
          Populares
        </button>
        <button
          @click="buscarLivrosBemAvaliados"
          class="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Bem Avaliados
        </button>
        <button
          @click="buscarLivrosGratuitos"
          class="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Gratuitos
        </button>
      </div>
    </section>

    <!-- Exibição dos Livros -->
    <div v-if="books.length > 0">
      <Card />
    </div>
    <div v-else>
      <p class="text-center text-xl">Carregando livros...</p>
    </div>
  </main>
</template>

