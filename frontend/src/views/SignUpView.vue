<template>
  <main class="flex flex-row">
    <AuthViewModel v-bind="props">
      <div class="w-full max-w-md mx-auto p-6 bg-white ">
        <!-- Título de Registro -->
        <h2 class="text-2xl font-bold text-black text-center mb-4">Cadastro</h2>
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

          <LoadingButton
            :isLoading="isSubmitting"
          >
            Registrar
          </LoadingButton>
        </form>
      </div>
    </AuthViewModel>
    <MageImage/>
  </main>
</template>


<script setup lang="ts">
import AuthViewModel from '@/components/AuthViewModel.vue';
import MageImage from '@/components/MageImage.vue';
import {Auth} from '@/services/auth';
import { reactive,ref } from 'vue';
import LoadingButton from '@/components/LoadingButton.vue'
import router from '@/router';
const isSubmitting = ref(false);
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
  isSubmitting.value = true;
  Auth.signUp(form.nickname,form.email,form.password)
  .then(() => router.push('/home'))
  .finally(() => isSubmitting.value = false);
}

</script>

<style scoped>

</style>
