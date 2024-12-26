<template>
  <main>
    <AuthViewModel v-bind="props">
      <div class="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
        <!-- Título de Registro -->
        <h2 class="text-2xl font-bold text-center mb-4">Cadastro</h2>

        <!-- Inputs de Registro -->
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="nickname" class="block text-sm font-medium text-gray-700">Nickname</label>
            <input
              id="nickname"
              type="text"
              v-model="form.nickname"
              placeholder="Digite seu nickname"
              class="input-custom"
            />
          </div>

          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              v-model="form.email"
              placeholder="Digite seu email"
              class="input-custom"
            />
          </div>

          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
            <input
              id="password"
              type="password"
              v-model="form.password"
              placeholder="Digite sua senha"
              class="input-custom"
            />
          </div>

          <!-- Botão de Submit -->
          <button
            type="submit"
            class="w-full py-2 btn"
          >
            Registrar
          </button>
        </form>
      </div>
    </AuthViewModel>
  </main>
</template>


<script setup lang="ts">
import AuthViewModel from '@/components/AuthViewModel.vue';





import { reactive } from 'vue';

const props = {
  button_msg: "Já tem conta? Login",
  button_ref: "login"
}

interface InputsProps{
  nickname: string;
  email: string;
  password: string;
}


const form = reactive<InputsProps>({
  nickname: '',
  email: '',
  password:''
});


const handleSubmit = ()=> {


}




</script>

<style scoped>

</style>
