<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { BookVolume } from '@/types/books';
import Header from '@/components/Header.vue';
import SearchPopUp from '@/components/SearchPopUp.vue';

const props = {
  isTrue: false,

}


// Dados fictícios para ilustrar a página de perfil
const profileImageIndex = ref(1); // Índice da imagem de perfil selecionada
const nickname = ref('Usuário Exemplo'); // Nome de usuário fictício

// Listas de livros (lidos, desejos, avaliações)
const booksLidos = ref<BookVolume[]>([]);
const listaDesejos = ref<BookVolume[]>([]);

// Exemplo de avaliações (depois você pode integrar com o backend ou DB)
const avaliacoes = ref([
  { id: '1', rating: 4, review: 'Excelente livro, muito envolvente!' },
  { id: '2', rating: 5, review: 'Uma das melhores leituras que já fiz!' },
]);

// Função para redirecionar para a página do livro
const router = useRouter();
const goToBookView = (bookId: string) => {
  router.push({ name: 'book-view', params: { id: bookId } });
};

// Controle de visibilidade do pop-up
const showPopup = ref(false);

// Função para abrir o pop-up
const openPopup = () => {
  showPopup.value = true;
};

// Função para fechar o pop-up
const closePopup = () => {
  showPopup.value = false;
};


// Função para adicionar um livro à lista (livros lidos ou lista de desejos)
const addToList = (book: BookVolume, isLidos: boolean) => {
  if (isLidos) {
    booksLidos.value.push(book);
  } else {
    listaDesejos.value.push(book);
  }
  closePopup(); // Fecha o pop-up após adicionar o livro
};

// Função para remover livro da lista de desejos
const removeFromList = (book: BookVolume) => {
  const index = listaDesejos.value.findIndex(b => b.id === book.id);
  if (index !== -1) {
    listaDesejos.value.splice(index, 1);
  }
};
</script>

<template>
  <Header v-bind="props"></Header>
  <div class="container mx-auto p-4">
    <!-- Seção de Imagem de Perfil e Nickname -->
    <div class="flex items-center justify-center mb-8">
      <div class="w-32 h-32 rounded-full overflow-hidden">
        <img
          :src="`/assets/profile_images/profile-${profileImageIndex}.jpg`"
          alt="Imagem de Perfil"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="ml-4">
        <h2 class="text-2xl font-semibold">{{ nickname }}</h2>
      </div>
    </div>

    <!-- Seção de Livros Lidos -->
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Livros Lidos</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="book in booksLidos"
          :key="book.id"
          class="card p-4 shadow-md flex flex-col items-center"
        >
          <img
            v-bind:src="book.volumeInfo.imageLinks.thumbnail"
            class="h-48 w-auto object-cover rounded-md shadow-md"
          />
          <h4 class="text-center mt-2 truncate">{{ book.volumeInfo.title }}</h4>
        </div>
      </div>
      <button
        @click="openPopup"
        class="mt-4 bg-green-500 text-white py-2 px-4 rounded"
      >
        +
      </button>
    </div>

    <!-- Seção de Lista de Desejos -->
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Lista de Desejos</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="book in listaDesejos"
          :key="book.id"
          class="card p-4 shadow-md flex flex-col items-center"
        >
          <img
            v-bind:src="book.volumeInfo.imageLinks.thumbnail"
            class="h-48 w-auto object-cover rounded-md shadow-md"
          />
          <h4 class="text-center mt-2 truncate">{{ book.volumeInfo.title }}</h4>
          <button
            @click="removeFromList(book)"
            class="mt-2 bg-red-500 text-white py-2 px-4 rounded"
          >
            Remover
          </button>
        </div>
      </div>
      <button
        @click="openPopup"
        class="mt-4 bg-green-500 text-white py-2 px-4 rounded"
      >
        +
      </button>
    </div>

    <!-- Seção de Avaliações -->
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
          <p class="text-center text-sm italic">{{ avaliacao.review }}</p>
          <button
            @click="goToBookView(avaliacao.id)"
            class="mt-4 bg-light-purple text-white py-2 px-4 rounded"
          >
            Ver Livro
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Componente Pop-up de Pesquisa -->
  <SearchPopUp
    v-model="showPopup" @close="closePopup"


    @addBook="addToList"
  />
</template>

<style scoped>
/* Estilos para o perfil */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
