<script setup lang="ts">
import Card from '@/components/Card.vue';
import SwitchDarkMode from '@/components/SwitchDarkMode.vue'
import Header from '@/components/Header.vue'
import type { Books } from '@/types/books';
import { reactive } from 'vue';


const books = reactive<Books[]>(
  [
    {
      id: 1,
      title: "Fuga",
      about:"Livro de terror"
    },
    {
      id: 2,
      title: "Batman",
      about:"Amor"
    },
    {
      id: 3,
      title: "Dragão",
      about:"Bravo"
    }
  ]
)

</script>




<template>
  <div class="flex-1">
    <Header></Header>
    <main>
      <h1>Hello world</h1>
      <div class="bg-slate-500">
        <Card v-bind:book="books"/>
      <SwitchDarkMode/>
      </div>
    <button>hi</button>

    </main>
  </div>
</template>
