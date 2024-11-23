<script setup lang="ts">
import { Books } from '@/types/books';
  const props = defineProps<{book:Books[]}>()
</script>

<template>
  <div class="bg-gray-500 gap-1 m-3" v-for="book in props.book" :key="book.id">
    <h1>{{book.title}}</h1>
    <p>{{ book.about }}</p>
    <a>sadsa</a>
  </div>
</template>


