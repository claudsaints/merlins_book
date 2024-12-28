<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { GoogleBooks } from '@/services/google';
import type { BookVolume } from '@/types/books';
import Header from '@/components/Header.vue';

const props = {
  isTrue: false
};
// Pegando o ID do livro pela rota
const route = useRoute();
const bookId = route.params.id as string;


// Estado reativo para armazenar o livro e a avaliação
const book = ref<BookVolume | null>(null);
const rating = ref<number>(0);
const review = ref<string>('');

// Função para buscar o livro específico
const fetchBookDetails = async () => {
  try {
    const result = await GoogleBooks.obterDetalhes(bookId);
    book.value = result;
  } catch (error) {
    console.error("Erro ao buscar detalhes do livro:", error);
  }
};

// Função para salvar a avaliação
const submitReview = () => {
  // Aqui você pode integrar com o backend para salvar a avaliação
  console.log(`Avaliação: ${rating.value} estrelas`);
  console.log(`Comentário: ${review.value}`);
};

// Carregar os detalhes do livro quando a página for carregada
fetchBookDetails();
</script>

<template>
  <Header v-bind="props"></Header>
  <div v-if="book">
    <h2 class="text-3xl font-semibold mb-6 text-center">{{ book.volumeInfo.title }}</h2>
    <div class="container mx-auto p-4">
      <div class="flex justify-center mb-4">
        <img
          v-bind:src="book.volumeInfo.imageLinks.thumbnail"
          class="h-64 w-auto object-cover rounded-md shadow-md"
        />
      </div>

      <p><strong>Autor(es):</strong> {{ book.volumeInfo.authors.join(', ') }}</p>
      <p><strong>Editora:</strong> {{ book.volumeInfo.publisher }}</p>
      <p><strong>Data de publicação:</strong> {{ book.volumeInfo.publishedDate }}</p>

      <p><strong>Descrição:</strong> {{ book.volumeInfo.description.replace(/<[^>]*>/g, '') }}</p>

      <!-- Seção de avaliação -->
      <div class="mt-6">
        <h3 class="text-2xl font-semibold">Avalie o livro</h3>

        <!-- Avaliação em estrelas -->
        <div>
          <label v-for="n in 5" :key="n">
            <input type="radio" :value="n" v-model="rating" />
            <span v-if="n <= rating">★</span>
            <span v-else>☆</span>
          </label>
        </div>

        <!-- Campo de comentário -->
        <div>
          <textarea v-model="review" placeholder="Deixe sua opinião..." rows="4" class="w-full p-2 border rounded-md mt-2"></textarea>
        </div>

        <!-- Botão de envio -->
        <button @click="submitReview" class="mt-4 bg-light-purple text-white py-2 px-4 rounded">Enviar Avaliação</button>
      </div>
    </div>
  </div>

  <div v-else class="flex align-middle justify-center">
    <p>Carregando detalhes do livro...</p>
  </div>
</template>
