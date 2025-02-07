<template>
  <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Avaliações</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="avaliacao in avaliacoes"
          :key="avaliacao.id"
          class="p-4 shadow-md flex flex-col items-center bg-gray-100 rounded-md"
        >
          <div v-if="props.modo === 'book'" class="flex justify-center gap-2">
            <img class=" self-center roudend h-8 w-8 " :src="`/${avaliacao.user.profile_img}.png`"/>

            <h4 class="text-black">{{avaliacao.user.nickname}} </h4>
          </div>

          <div class="flex justify-center mb-2">
            <span v-for="n in 5" :key="n" class="text-yellow-500">
              <span v-if="n <= avaliacao.rate">★</span>
              <span v-else>☆</span>
            </span>
          </div>
          <p class="text-center text-black text-sm italic">{{ avaliacao.comment }}</p>
          <button
            v-if="props.modo ==='profile'"


            @click="goToBookView(avaliacao.bookId)"
            class="mt-4 btn py-2 px-4 "
          >
            Ver Livro
          </button>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import type {Review} from '@/types/reviews'


const props = defineProps({
  modo: {
      type: String,
      required: true}
})

const avaliacoes =  inject<Review[]>('reviews')

const router = useRouter();
const goToBookView = (bookId: string) => {
  router.push({ name: 'book-view', params: { id: bookId } });
};

</script>

