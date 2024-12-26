<template>
  <div class="book-search">
    <input type="text" v-model={query}" @input="searchBooks" placeholder="Pesquise um livro" />
    <div v-if="isSearching">Carregando...</div>
    <ul v-if="books.length">
      <li v-for="book in books" :key="book.id">
        {{ book.title }}
        <button @click="addBook(book)">Adicionar</button>
      </li>
    </ul>
    <button @click="$emit('close')">Fechar</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    query: String,
  },
  data() {
    return {
      isSearching: false,
      books: [],
    };
  },
  methods: {
    async searchBooks() {
      if (this.query.length < 3) return; // Garantir que a pesquisa tenha pelo menos 3 caracteres
      this.isSearching = true;

      // Simulação de uma chamada à API de pesquisa de livros
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.query}`);
      const data = await response.json();

      this.books = data.items || [];
      this.isSearching = false;
    },
    addBook(book: any) {
      this.$emit('addBook', book);
    }
  }
});
</script>

<style scoped>
.book-search {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
}
</style>
