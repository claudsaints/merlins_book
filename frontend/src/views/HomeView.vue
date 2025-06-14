<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import Header from '@/components/Header.vue';
import BookCategoryBar from '@/components/BookCategoryBar.vue';
import BookSearchBar from '@/components/BookSearchBar.vue';
import BookList from '@/components/BookList.vue';
import BookPagination from '@/components/BookPagination.vue';
import { provide, watchEffect, ref } from 'vue';
import { GoogleBooks } from '../services/google';
import type { BooksProps, BookVolume } from '@/types/books';

const books = ref<BookVolume[]>([]);
const searchQuery = ref('');
const categoria = ref('Livros Populares');
const props = { isTrue: true};

// Paginação
const page = ref(1);
const totalPages = ref(1);
const maxResults = 10;
const currentFetch = ref<{ func: (params?: any) => Promise<BooksProps>, params?: any }>({ func: GoogleBooks.buscarLivrosPorCategoria, params: { categoria: 'fiction', startIndex: 0 } });
const isLoading = ref(false);

const fetchData = async (func: (params?: any) => Promise<BooksProps>, params?: any) => {
  isLoading.value = true;
  currentFetch.value = { func, params };
  try {
    const result = await func(params);
    if (result && Array.isArray(result.items) && result.items.length > 0) {
      books.value = [...result.items];
      totalPages.value = Math.ceil((result.totalItems || 0) / maxResults) || 1;
    } else {
      books.value = [];
      totalPages.value = 1;
    }
  } catch {
    books.value = [];
    totalPages.value = 1;
  }
  isLoading.value = false;
}

const pesquisarLivros = async () => {
  page.value = 1;
  if (searchQuery.value.trim() === '') {
    await fetchData(() => GoogleBooks.buscarLivrosPorCategoria('fiction'), { categoria: 'fiction', startIndex: 0 });
    categoria.value = 'Ficção';
  } else {
    try {
      categoria.value = `Resultados para "${searchQuery.value}"`;
      const result = await GoogleBooks.pesquisarPorQuery(searchQuery.value, 0);
      if (Array.isArray(result.items)) {
        books.value = [];
        books.value.push(...result.items);
        totalPages.value = Math.ceil((result.totalItems || 0) / maxResults) || 1;
      } else {
        console.error("Erro: result.items não é um array", result);
      }
    } catch (err) {
      console.error("Erro ao buscar livros:", err);
    }
  }
};

const goToPage = async (newPage: number) => {
  if (newPage < 1 || newPage > totalPages.value) return;
  page.value = newPage;
  const startIndex = (page.value - 1) * maxResults;
  isLoading.value = true;
  try {
    if (categoria.value.startsWith('Resultados para')) {
      await fetchData((params) => GoogleBooks.pesquisarPorQuery(searchQuery.value, params.startIndex), { startIndex });
    } else {
      await fetchData(currentFetch.value.func, { ...currentFetch.value.params, startIndex });
    }
  } catch {
    books.value = [];
    totalPages.value = 1;
  }
  isLoading.value = false;
};


provide('books', books);
</script>

<template>
  <Header v-bind="props" />
  <main class="flex-1 mt-5">
    <BookSearchBar v-model="searchQuery" @search="pesquisarLivros" />
    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-4 text-center">{{ categoria }}</h2>
      <BookCategoryBar
        @bemAvaliados="() => { page = 1; fetchData(() => GoogleBooks.buscarLivrosBemAvaliados(), {}); categoria = 'Livros Bem Avaliados'; }"
        @categoria="({ cat, label }) => { page = 1; fetchData((params) => GoogleBooks.buscarLivrosPorCategoria(cat, params.startIndex), { categoria: cat, startIndex: 0 }); categoria = label; }"
      />
    </section>
    <BookList :books="books" :isLoading="isLoading" />
    <BookPagination
      v-if="books.length > 0 && totalPages > 1"
      :page="page"
      :totalPages="totalPages"
      :books="books"
      @change="goToPage"
    />
  </main>
</template>

