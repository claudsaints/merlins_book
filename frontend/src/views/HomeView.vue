<script setup lang="ts">
import Card from '@/components/Card.vue';
import Header from '@/components/Header.vue'
import { provide, reactive ,watchEffect} from 'vue';
import{ GoogleBooks} from  '../services/google'
import type { BookVolume } from '@/types/books';


  // Definindo o estado reativo para os livros
  const books = reactive<BookVolume[]>([]);

  // Utilizando o watchEffect para chamar a função de pesquisa assim que a aplicação é montada
  watchEffect(async () => {
  const result = await GoogleBooks.pesquisar();

  if (Array.isArray(result.items)) {
    books.length = 0; // Limpa o array de livros
    books.push(...result.items); // Adiciona os itens encontrados ao array reativo
  } else {
    console.error("Erro: result.items não é um array", result);
  }


});

provide('books', books);

</script>




<template>

    <Header></Header>
    <main class="flex-1 mt-5">


        <Card />



    </main>

</template>
