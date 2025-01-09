<template>
  <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Avaliações</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="avaliacao in avaliacoes"
          :key="avaliacao.id"
          class="p-4 shadow-md flex flex-col items-center bg-gray-100 rounded-md"
        >
          <div class="flex justify-center mb-2">
            <span v-for="n in 5" :key="n" class="text-yellow-500">
              <span v-if="n <= avaliacao.rating">★</span>
              <span v-else>☆</span>
            </span>
          </div>
          <p class="text-center text-black text-sm italic">{{ avaliacao.review }}</p>
          <button
            @click="goToBookView(avaliacao.id)"
            class="mt-4 btn py-2 px-4 "
          >
            Ver Livro
          </button>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const avaliacoes = ref([
  { id: '1', rating: 4, review: 'Excelente livro, muito envolvente!' },
  { id: '2', rating: 5, review: 'Uma das melhores leituras que já fiz!' },
]);


const router = useRouter();
const goToBookView = (bookId: string) => {
  router.push({ name: 'book-view', params: { id: bookId } });
};


</script>

<style scoped>

</style>
