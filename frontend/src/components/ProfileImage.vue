<template>
   <div class="flex items-center justify-center mb-8">
      <div class="w-32 h-32 rounded-full overflow-hidden">
        <img
          :src="`/${props.profileImageName}.jpg`"
          alt="Imagem de Perfil"
          class="w-full h-full object"
        />
      </div>
      <div class="ml-4">
        <h2 class="text-2xl font-semibold">{{ props.nickname }}</h2>
      </div>
    </div>
</template>

<script setup lang="ts">
import {defineProps }from 'vue';

const props = defineProps({
  profileImageName: String,
  nickname: String
});

</script>


