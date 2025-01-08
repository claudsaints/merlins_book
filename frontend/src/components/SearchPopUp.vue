<script setup lang="ts">
import type { BookVolume } from '@/types/books';
import { defineProps, defineEmits,reactive ,ref} from 'vue';
import { GoogleBooks } from '../services/google';


const props = defineProps({
  modelValue: Boolean,
  popId: String
});


const books = reactive<BookVolume[]>([]);
const searchQuery = ref('');

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;

}>();


const addBook = (book:BookVolume) => {
  console.log(book)
}


// Função para fechar o popup
function close() {
  // Emitir o evento 'update:modelValue' para atualizar a variável no pai
  console.log(props.popId)
  emit('update:modelValue', false);

}


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
  <div v-if="modelValue" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white h-3/4 p-6 rounded-lg shadow-xl w-11/12 sm:w-96">
      <div class="mb-4 flex">
        <input
         v-model="searchQuery"
        @keyup.enter="pesquisarLivros"
          type="text"
          placeholder="Pesquisar livro..."
          class="w-full p-2 border rounded-md"
        />
        <button
        @click="pesquisarLivros"
        class="ml-2 px-4 py-2 btn text-white rounded-lg"
      >
        Pesquisar
      </button>
      </div>
      <div class="mb-4 flex h-3/4  gap-4 flex-col overflow-scroll items-center">
        <div v-for="book in books" :key="book.id" class="card p-4 w-3/4 shadow-md flex flex-col items-center">
          <img
            v-bind:src="book.volumeInfo.imageLinks.thumbnail"
            class="h-48 w-auto object-cover rounded-md shadow-md"
          />
          <h3 class="text-lg font-medium text-center truncate overflow-hidden text-ellipsis max-w-full">{{ book.volumeInfo.title }}</h3>
          <button
            @click="addBook(book)"
            class="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Adicionar
          </button>
        </div>
      </div>
      <button
        @click="close"
        class="mt-2 w-full bg-gray-500 text-white py-2 rounded"
      >
        Fechar
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
