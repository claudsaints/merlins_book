<script setup lang="ts">
import { ref, provide } from 'vue';
import type { BookVolume } from '@/types/books';
import Header from '@/components/Header.vue';
import SearchPopUp from '@/components/SearchPopUp.vue';
import ProfileImage from '@/components/ProfileImage.vue';
import Rating from '@/components/Rating.vue';
import ProfileSaves from '@/components/ProfileSaves.vue';

const props = {
  isTrue: false,
}

const image = ref('default');
const nickname = ref('Usuário Exemplo');


const booksLidos = ref<BookVolume[]>([]);
const listaDesejos = ref<BookVolume[]>([]);


const showPopup = ref(false);
const _popId = ref('');


const openPopup = (popId: string) => {
  showPopup.value = true;
  _popId.value = popId;
};


const closePopup = () => {
  showPopup.value = false;
  _popId.value = ''
};



const addToList = (book: BookVolume, isLidos: boolean) => {
  if (isLidos) {
    booksLidos.value.push(book);
  } else {
    listaDesejos.value.push(book);
  }
  closePopup();
};

provide('open', openPopup);

</script>

<template>
  <Header v-bind="props"></Header>
  <div class="container mx-auto p-4">
    <ProfileImage :nickname="nickname" :profileImageName="image" />
    <ProfileSaves title="Livros Lidos" type="read" />
    <ProfileSaves title="Lista de desejo" type="wishlist" />
    <Rating />
  </div>
  <SearchPopUp :popId="_popId" v-model="showPopup" @close="closePopup" @addBook="addToList" />
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
