
<template>
  <button class="btn w-full py-2 flex align-middle justify-center ">
    <svg v-show="isLoading" class="w-6 h-6 text-white animate-spin" fill="none"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"></path>
    </svg>
    <span :class="{'hidden': isLoading}">
      <slot></slot>
    </span>
  </button>
</template>

  <script setup lang="ts">
  defineProps({
    isLoading: {
      type: Boolean,
      default: false
    }
  });
  </script>
