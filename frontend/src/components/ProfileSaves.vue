<template>
  <div class="mb-8">
    <h3 class="text-xl font-semibold mb-4">{{ props.title }}</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="book in data"
        :key="book.bookId"
        class="p-4 shadow-md flex flex-col items-center"
      >
        <img
          v-bind:src="book.link_img"
          alt="Book image"
          class="h-48 w-auto object-cover rounded-md shadow-md"
        />
        <h4 class="text-center mt-2 truncate">{{ book.title }}</h4>
        <button
              @click="removeBook(book)"
              class="mt-2 bg-red-500 text-white py-2 px-4 rounded"
            >
              Remover
            </button>
      </div>
    </div>
    <button
      @click="openPopup(props.type)"
      class="mt-4 bg-green-400 text-white py-2 px-4 rounded"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, inject, ref, watchEffect } from 'vue'
import type { BookSaves, SaveBook } from '@/types/api'
import { Books } from '@/services/books'


const props = defineProps({
  title: String,
  type: String
})


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const openPopup:any = inject('open')
const saves = inject<BookSaves>('data')
const fetchUserSaves = inject<() => Promise<void>>('fetchUserSaves');

const data = ref<SaveBook[]>([])

const removeBook = (book:SaveBook ) => {

  data.value = data.value.filter(item => item.id !== book.id );


  Books.deleteBook(book.id).then(() => {
    console.log('Livro removido com sucesso');
  }).catch((error) => {
    console.error('Erro ao remover livro:', error);
  });
}


watchEffect(() => {
  console.log("saves",saves)
  fetchUserSaves?.().then(() => {
    if (props.type === 'wishlist' && saves?.wishlist) {
      data.value = saves.wishlist
    } else if (props.type === 'read' && saves?.read) {
      data.value = saves.read
    }
  })
})
</script>

