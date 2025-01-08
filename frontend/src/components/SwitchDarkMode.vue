<template>
  <button @click="toggleDarkMode" class="btn">
    Alternar Modo
  </button>
</template>

<script setup lang="ts">

const toggleDarkMode = () => {
  const htmlElement = document.body;
  htmlElement.classList.toggle('dark');

  //local storage
  if (htmlElement.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

</script>

