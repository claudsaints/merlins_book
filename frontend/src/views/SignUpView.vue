<template>
  <main class="flex flex-row">
    <AuthViewModel button_msg="Já tem conta? Login" button_ref="login">
      
      <h2  class="text-2xl self-start ml-6 font-bold text-light-purple  mb-4 ">Crie sua conta!</h2>
      <div class="w-[85%] max-w-md  mx-auto  ">
        <form>
          <div class="mb-4">
            <label for="nickname" class="block text-sm font-medium text-gray-700">Nickname</label>
            <input id="nickname" type="text" v-model="form.nickname" placeholder="Digite seu nickname"
              class="input-custom" />
          </div>

          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" v-model="form.email" placeholder="Digite seu email" class="input-custom" />
          </div>

          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
            <input id="password" type="password" v-model="form.password" placeholder="Digite sua senha"
              class="input-custom" />
          </div>

          <LoadingButton :isLoading="isSubmitting" @click.prevent="handleSubmit" :disabled="isSubmitting" class="mt-4">
            Registrar
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
import LoadingButton from '@/components/LoadingButton.vue'
import { Auth } from '@/services/auth';
import { reactive, ref } from 'vue';
import router from '@/router';
import { validateEmail, validateNickname, validatePassword } from '@/utils/validators';

const isSubmitting = ref(false);
const errorMessage = ref<string | null>(null);

interface InputsProps {
  nickname: string;
  email: string;
  password: string;
}

const form = reactive<InputsProps>({
  nickname: '',
  email: '',
  password: ''
});

const handleSubmit = async () => {
  if (!validateEmail(form.email)) {
    return errorMessage.value = "E-mail inválido.";
  } else if (!validateNickname(form.nickname)) {
    return errorMessage.value = "Nickname deve ter entre 6 e 24 caracteres.";
  } else if (!validatePassword(form.password)) {
    return errorMessage.value = "Senha deve ter entre 6 e 12 caracteres.";
  } 

    errorMessage.value = null;
    isSubmitting.value = true;
    try{
      await Auth.signUp(form.nickname, form.email, form.password);
      router.push('/home')
    }catch(error) {
      console.error(error);
      errorMessage.value = "Erro ao criar conta. Tente novamente.";
    } finally {
      isSubmitting.value = false;
    }
  
  }


</script>
