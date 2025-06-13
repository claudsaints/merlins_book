<template>
  <div class="flex flex-col md:flex-row w-full min-h-screen items-center justify-center ">
    <div class="flex flex-col flex-1 max-w-xl h-auto  justify-center items-start p-8 gap-4">
      <h1 class="text-6xl md:text-7xl text-left font-extrabold mb-2 text-dark-purple">Merlin's Book</h1>
      <h2 class="text-3xl md:text-4xl font-bold mb-4 text-light-purple">Sobre Nós</h2>
      <p class="text-lg  max-w-2xl text-left">
        Bem-vindo ao Merlin's Book, seu destino definitivo para amantes de livros!
        Somos dedicados a fornecer uma plataforma onde leitores podem descobrir,
        avaliar e compartilhar seus livros favoritos. Nossa missão é fomentar uma
        comunidade de leitores apaixonados e tornar o mundo da literatura mais acessível.
      </p>
      <p class="text-lg t max-w-2xl text-left mt-4">
        Junte-se a nós nessa jornada para explorar o mundo mágico dos livros!
      </p>
      <div class="flex flex-row gap-5 mt-6 w-full">
        <button class="btn w-full md:w-auto py-4 px-8 text-lg" @click="goToSignUp">Cadastrar</button>
        <button class="btn w-full md:w-auto py-4 px-8 text-lg" @click="goToSignIn">Entrar</button>
      </div>
    </div>
    <div class="flex flex-col flex-1 items-center justify-center mt-8 md:mt-0">
      <img src="/merlin_computer.svg" alt="Merlin's Book no Computador" class="w-60 h-60 md:w-96 md:h-96 mb-4 scale-x-[-1]">
      <p class="text-sm opacity-5 ">© 2024 Merlin's Book. Todos os direitos reservados.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const goToSignIn = () => {
  router.push({ name: 'login' });
};
const goToSignUp = () => {
  router.push({ name: 'signup' });
};
</script>

