<template>
  <header class="header">

      <h1 class=""> Merlin's Book</h1>

      <div class="search-container">
        <slot name="search"></slot>
      </div>
      <SwitchDarkMode/>


  </header>

</template>

<script setup lang="ts">
import SwitchDarkMode from './SwitchDarkMode.vue';


</script>


