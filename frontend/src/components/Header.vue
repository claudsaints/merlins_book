<template>
  <header class="header">
    <h1 @click="redirect('/home')" class="self-center cursor-pointer"> Merlin's Book</h1>
    <div v-if="isTrue" class="flex h-auto ">
      <SwitchDarkMode />
      <img @click="redirect('/profile')" class="self-center hover:cursor-pointer ml-4 h-6 w-6" src="./icons/profile.svg" />
    </div>

  </header>

</template>

<script setup lang="ts">
import router from '@/router';
import SwitchDarkMode from './SwitchDarkMode.vue';
defineProps<{ isTrue: boolean }>()

const redirect = (value: string) => {
  router.push({ path: value })
}

</script>
