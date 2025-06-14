<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header class="header">
    <h1 @click="redirect('/home')" class=" text-dark-purple self-center cursor-pointer"> Merlin's Book</h1>
    <div v-if="isTrue" class="flex h-auto ">
      <SwitchDarkMode />
      <button class="btn">

        <img  @click="redirect('/profile')" class="h-full w-full" src="./icons/profile.svg" />
      </button>
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
