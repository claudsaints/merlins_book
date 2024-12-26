<template>
  <header class="header">

      <h1 @click="redirect('/')" class="self-center cursor-pointer"> Merlin's Book</h1>




      <div v-if="isTrue" class="flex h-auto ">
        <SwitchDarkMode/>

        <a href="profile"  class="self-center ml-5">Profile</a>
      </div>

  </header>

</template>

<script setup lang="ts">
import router from '@/router';
import SwitchDarkMode from './SwitchDarkMode.vue';
defineProps<{isTrue: boolean}>()

const redirect = (value:string) => {
    router.push({ path: value })
  }

</script>


