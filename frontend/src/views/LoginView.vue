<template>
  <main>
    <AuthViewModel v-bind="props">

      <div class="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
        <!-- Título de Login -->
        <h2 class="text-2xl font-bold text-center mb-4">Login</h2>

        <!-- Formulário de Login -->
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" v-model="form.email" placeholder="Digite seu email" class="input-custom" />
          </div>

          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
            <input id="password" type="password" v-model="form.password" placeholder="Digite sua senha"
              class="input-custom" />
          </div>

          <!-- Botão de Login -->
          <button type="submit"
            class="btn w-full py-2">
            Entrar
          </button>
        </form>
      </div>
    </AuthViewModel>

  </main>
</template>

<script setup lang="ts">
import AuthViewModel from '@/components/AuthViewModel.vue';
import { reactive } from 'vue';

// Definindo a interface para os inputs de login
interface LoginProps {
  email: string;
  password: string;
}

// Criando o objeto reativo para o login
const form = reactive<LoginProps>({
  email: '',
  password: ''
});

const props = {
  button_msg: "Ainda não tem conta? Cadastre-se",
  button_ref: "signup"
}

    function  handleLogin() {
      // Lógica para login aqui, como chamar um serviço de autenticação
      console.log('Login realizado com:', this.form);
      // Exemplo: Fazer a requisição para a API de login ou redirecionar o usuário.
    }

</script>

<style scoped>

</style>
