<template>
  <button @click="toggleDarkMode" class="btn">
    Alternar Modo
  </button>

</template>

<script setup lang="ts">
  const toggleDarkMode = () => {
  const htmlElement =  document.firstElementChild.lastChild;
  htmlElement.classList.toggle('dark');
  // Salva a escolha no localStorage
  if (htmlElement.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}
</script>


