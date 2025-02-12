<script setup lang="ts">
import { ref, provide, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { GoogleBooks } from '@/services/google';
import type { BookVolume } from '@/types/books';
import Rating from '@/components/Rating.vue'
import Header from '@/components/Header.vue';
import { Reviews } from '@/services/reviews'
import type { Review } from '@/types/reviews'
import LoadingButton from '@/components/LoadingButton.vue'

const props = {
  isTrue: true
};

const route = useRoute();
const bookId = route.params.id as string;
const isSubmitting = ref(false);

const book = ref<BookVolume | null>(null);
const rating = ref<number>(0);
const review = ref<string>('');


const fetchBookDetails = async () => {
  try {
    const result = await GoogleBooks.obterDetalhes(bookId);
    book.value = result;
  } catch (error) {
    console.error("Erro ao buscar detalhes do livro:", error);
  }
};

const setRating = (valor: number) => {
  rating.value = valor;
};


const submitReview = () => {
  isSubmitting.value = true;
  Reviews.createReview(bookId, rating.value, review.value)
    .finally(() => {
      isSubmitting.value = false;
      fetchBookDetails();
      Reviews.findBookReviews(bookId).then((d) => avaliacoes.value = d);
    });


};


fetchBookDetails();

const avaliacoes = ref<Review[]>([])

watchEffect(() => {
  Reviews.findBookReviews(bookId).then((d) => avaliacoes.value = d);
})


provide('reviews', avaliacoes)
</script>

<template>
  <Header v-bind="props"></Header>
  <div v-if="book">
    <h2 class="text-3xl font-semibold mb-6 mt-5 text-center">{{ book.volumeInfo.title }}</h2>
    <div class="container mx-auto p-4">
      <div class="flex justify-center mb-4">
        <img v-bind:src="book.volumeInfo.imageLinks.thumbnail" class="h-64 w-auto object-cover rounded-md shadow-md" />
      </div>

      <p><strong>Autor(es):</strong> {{ book.volumeInfo.authors.join(', ') }}</p>
      <p><strong>Editora:</strong> {{ book.volumeInfo.publisher }}</p>
      <p><strong>Data de publicação:</strong> {{ book.volumeInfo.publishedDate }}</p>

      <p><strong>Descrição:</strong> {{ book.volumeInfo.description.replace(/<[^>]*>/g, '') }}</p>


      <div class="mt-6 mb-6">
        <h3 class="text-2xl font-semibold">Avalie o livro</h3>
        <div class="flex items-center space-x-1">
          <label v-for="n in 5" :key="n">

            <span class="cursor-pointer text-2xl"
              :class="{ 'text-yellow-400': n <= rating, 'text-gray-300': n > rating }" @click="setRating(n)">
              {{ n <= rating ? '★' : '☆' }} </span>
          </label>
        </div>

        <div>
          <textarea v-model="review" placeholder="Deixe sua opinião..." rows="4"
            class="w-full p-2 border text-black rounded-md mt-2"></textarea>
        </div>

        <LoadingButton @click="submitReview" :isLoading="isSubmitting" class="mt-4">Enviar Avaliação</LoadingButton>
      </div>
      <Rating modo="book" />
    </div>
  </div>

  <div v-else class="flex align-middle justify-center">
    <p>Carregando detalhes do livro...</p>
  </div>
</template>
