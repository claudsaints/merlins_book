<template>
  <div class="bg-white text-black h-screen bord w-full md:w-2/5 sm:w-full flex flex-col text-center items-center gap-3 sm:shadow-lg sm:shadow-gray-300">
    <h1 @click="router.push('/')" class=" cursor-pointer text-4xl md:text-4xl mt-5 font-extrabold mb-2 text-dark-purple text-left self-start ml-5">Merlin's Book</h1>
    <slot></slot>
    <hr class="my-6 border-t-4 border-light-purple w-full mx-auto"/>
    <button @click="redirect(button_ref)" class="border-2 border-dark-purple bg-transparent px-4 py-2 rounded-md btn">
      {{ button_msg }}
    </button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
  defineProps<{
  button_msg:string;
  button_ref:string;
}>()

  const redirect = (value:string) => {
    router.push({ path: value })
  }
</script>

<style scoped>

</style>
