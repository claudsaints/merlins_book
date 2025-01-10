<template>
  <div class="flex items-center justify-center mb-8">
    <div class="w-32 h-32 rounded-full overflow-hidden">
      <img :src="`/${profileImageName}.jpg`" alt="Imagem de Perfil" class="w-full h-full object" />
    </div>
    <button @click="openPopup()" class="relative right-5 top-10 z-0 bg-red-400 text-white ">
      t
    </button>
    <div class="ml-4">
      <h2 class="text-2xl font-semibold">{{ nickname ? nickname : 'User Default' }}</h2>
    </div>
    <PopUp v-model="isVisible" >
      <div v-for="name in image_links" :key="name"
        class="flex align-middle justify-center"
      >
        <SelectImage :image_url="name"/>

      </div>
    </PopUp>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import PopUp from './PopUp.vue';
import SelectImage from './SelectImage.vue';

const isVisible = ref(false);

const image_links: string [] =  ['default','bunny','frog','panda']

const openPopup = () => {
  isVisible.value = true;
};

const profileImageName = ref(sessionStorage.getItem('image'));
const nickname = sessionStorage.getItem('nickname');

provide('profileImage',profileImageName);

</script>
