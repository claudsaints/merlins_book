<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">{{props.title}}</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="book in data"
          :key="book.bookId"
          class="card p-4 shadow-md flex flex-col items-center"
        >
          <img
            v-bind:src="book.link_img"
            class="h-48 w-auto object-cover rounded-md shadow-md"
          />
          <h4 class="text-center mt-2 truncate">{{ book.title }}</h4>
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
import {defineProps, inject, reactive,  watchEffect} from 'vue'
import type { SaveBook } from '@/types/api';
import { Books } from '@/services/books';

const props = defineProps({
  title: String,
  type: String
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const openPopup: any = inject('open');

const data = reactive<SaveBook[]>([])

watchEffect(() => {
  Books.getUserSaves().then((d) => {
    if(props.type == 'wishlist') data.push(d.wishlist);
    else data.push(d.read)

  });
},)
// const removeFromList = () => {

// };

</script>

<style scoped>

</style>
