<template>
  <div class="flex items-center justify-center mb-8">
    <div class="w-32 h-32 rounded-full overflow-hidden">
      <img :src="`/${profileImageName}.png`" alt="Imagem de Perfil" class="w-full h-full object" />
    </div>
    <button @click="openPopup()" class="relative right-5 top-10 z-0  text-white ">
      <img class="h-5 w-5" src="./icons/edit.svg"/>
    </button>
    <div class="ml-4">
      <h2 class="text-2xl font-semibold">{{ nickname ? nickname : 'User Default' }}</h2>
    </div>
    <div class="ml-4">
      <button class="text-red-500" @click="logout">Logout</button>
    </div>

    <PopUp v-model="isVisible" >
      <div class="flex flex-col  align-middle justify-center overflow-scroll">

        <div v-for="name in image_links" :key="name"
        >
        <SelectImage :image_url="name"/>

      </div>
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

const logout = () => {
  sessionStorage.clear();
  window.location.replace('/login');
}

const profileImageName = ref(sessionStorage.getItem('image'));
const nickname = sessionStorage.getItem('nickname');

provide('profileImage',profileImageName);

</script>
