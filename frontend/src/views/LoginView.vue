<template>
  <main class="flex flex-row">
    <AuthViewModel button_msg="Ainda não tem conta? Cadastre-se" button_ref="signup">
      <h2 class="text-2xl self-start ml-6 font-bold text-light-purple  mb-4">Realizar Login</h2>
      <div class="w-full max-w-md mx-auto p-6 bg-white  ">
        <form>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" v-model="form.email" placeholder="Digite seu email" class="input-custom" />
          </div>

          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
            <input id="password" type="password" v-model="form.password" placeholder="Digite sua senha"
              class="input-custom" />
          </div>

          <LoadingButton :isLoading="isSubmitting" @click.prevent="handleLogin" :disabled="isSubmitting" class="mt-4">
            Entrar
          </LoadingButton>
        </form>
        <div v-if="errorMessage" class="error">
          {{ errorMessage }}
        </div>
      </div>
    </AuthViewModel>
    <MageImage />

  </main>
</template>

<script setup lang="ts">
import AuthViewModel from '@/components/AuthViewModel.vue';
import MageImage from '@/components/MageImage.vue';
import LoadingButton from '@/components/LoadingButton.vue';
import { Auth } from '@/services/auth';
import { reactive, ref } from 'vue';
import { validateEmail, validatePassword } from "@/utils/validators";
import router from '@/router';

const isSubmitting = ref(false);
const errorMessage = ref<string | null>(null);

interface LoginProps {
  email: string;
  password: string;
}

const form = reactive<LoginProps>({
  email: '',
  password: ''
});

async function handleLogin() {
  if (!validateEmail(form.email)) {
    return errorMessage.value = "E-mail inválido.";
  } else if (!validatePassword(form.password)) {
    return errorMessage.value = "Senha deve ter entre 6 e 12 caracteres.";
  } 
  isSubmitting.value = true;
  isSubmitting.value = true;

  try{
    await Auth.signIn(form.email, form.password);
    router.push('/home');
  }catch (error) {
    console.log(error);
   
    errorMessage.value = "Ocorreu um erro ao realizar o login.";
  
  }finally{
    isSubmitting.value = false;
    
  }
  

}

</script>
