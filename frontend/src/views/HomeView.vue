<script setup lang="ts">
import Card from '@/components/Card.vue';
import Header from '@/components/Header.vue';
import { provide, watchEffect, ref } from 'vue';
import { GoogleBooks } from '../services/google';
import type { BooksProps, BookVolume } from '@/types/books';

const books = ref<BookVolume[]>([]);
const searchQuery = ref('');
const categoria = ref('Livros Populares');
const props = { isTrue: true};

const fetchData = async (func: () => Promise<BooksProps>) => {
  const result = await func();
  if (Array.isArray(result.items)) {
    books.value = [];
    books.value.push(...result.items);
  }
}

const pesquisarLivros = async () => {
  if (searchQuery.value.trim() === '') {

    await fetchData(GoogleBooks.buscarLivrosPopulares);
  } else {
    try {
      categoria.value = `Resultados para "${searchQuery.value}"`;
      const result = await GoogleBooks.pesquisarPorQuery(searchQuery.value);
      if (Array.isArray(result.items)) {
        books.value = []
        books.value.push(...result.items);
      } else {
        console.error("Erro: result.items não é um array", result);
      }
    } catch (err) {
      console.error("Erro ao buscar livros:", err);
    }
  }
};


watchEffect(() => {
  fetchData(() => GoogleBooks.buscarLivrosPopulares())
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
        class="px-4 py-2 border rounded-lg w-80 text-black"
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
      <h2 class="text-2xl font-semibold mb-4 text-center">{{ categoria }}</h2>
      <div class="flex justify-center mb-4">
        <button
          @click="fetchData(() => GoogleBooks.buscarLivrosPopulares()), categoria = 'Livros Populares'"
          class="px-4 py-2 bg-yellow-500 text-white rounded-lg"
        >
          Populares
        </button>
        <button
          @click="fetchData(() => GoogleBooks.buscarLivrosBemAvaliados()), categoria = 'Livros Bem Avaliados'"
          class="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Bem Avaliados
        </button>
        <button
          @click="fetchData(() => GoogleBooks.buscarLivrosGratuitos()), categoria = 'Livros Gratuitos'"
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
    <div class="self-center justify-center align-middle justify-self-center bg-red-200 h-20 w-50 flex flex-row">
      <button>
        retrair
      </button>
      <p>
        page
      </p>
      <button>
        avançar
      </button>
    </div>

  </main>
</template>

