<script setup lang="ts">
import { ref, provide, watchEffect } from 'vue';
import Header from '@/components/Header.vue';
import PopUp from '@/components/PopUp.vue';
import ProfileImage from '@/components/ProfileImage.vue';
import Rating from '@/components/Rating.vue';
import ProfileSaves from '@/components/ProfileSaves.vue';
import {Reviews} from '@/services/reviews'
import type {Review} from '@/types/reviews'
import Search from '@/components/Search.vue'

const props = {
  isTrue: false,
}

const showPopup = ref(false);
const _popId = ref('');


const openPopup = (popId: string) => {
  showPopup.value = true;
  _popId.value = popId;
};


const avaliacoes = ref<Review[] >([])

watchEffect(() => {
  Reviews.findUserReviews().then((d) => avaliacoes.value = d);
})


provide('open', openPopup);
provide('reviews', avaliacoes)
</script>

<template>
  <Header v-bind="props"></Header>
  <div class="container mx-auto p-4">
    <ProfileImage />
    <ProfileSaves title="Livros Lidos" type="read" />
    <ProfileSaves title="Lista de desejo" type="wishlist" />
    <Rating modo="profile"/>
  </div>
  <PopUp v-model="showPopup" >
    <Search :popId="_popId"/>
  </PopUp>
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
