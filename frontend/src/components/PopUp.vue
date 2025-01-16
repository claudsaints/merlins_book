<template>
  <div v-if="modelValue" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10 ">
    <div class="bg-white h-3/4 p-6 rounded-lg shadow-xl w-11/12 sm:w-96 sm:h-5/6 sm:overflow-scroll">
      <slot></slot>
      <button
        @click="close"
        class="mt-2 w-full bg-gray-500 text-white py-2 rounded sm:m-0"
      >
        Fechar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">


import { defineProps, defineEmits} from 'vue';

defineProps({
  modelValue: Boolean,
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;

}>();


function close() {
  emit('update:modelValue', false);
}
</script>

<style scoped>

</style>
