<template>
  <div class="flex flex-row align-middle justify-center text-center ">
    <img :src="`/${props.image_url}.png`" alt="selecinar imagem" class=" h-20 w-20 p-2 m-2"/>
    <button @click="selection" class="bg-green-400 h-8 self-center rounded" >
      selecionar
    </button>
  </div>
</template>

<script setup lang="ts">
import { Auth } from '@/services/auth';
import { inject } from 'vue';


const props = defineProps({
  image_url: {type: String, required: true}
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const image:any = inject('profileImage');

const selection = async () => {
  sessionStorage.setItem('image',props.image_url);
  await Auth.updateImage(props.image_url);
  image.value = sessionStorage.getItem('image');

}

</script>

