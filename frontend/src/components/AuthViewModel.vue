<template>
  <div class="bg-white h-screen bord w-full sm:w-2/5 flex flex-col text-center items-center justify-center sm:shadow-lg sm:shadow-gray-300">
    <slot></slot>
    <hr class="my-6 border-t-4 border-light-purple w-1/2 mx-auto"/>
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
