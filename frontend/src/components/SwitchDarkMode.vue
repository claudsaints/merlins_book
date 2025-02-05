<template>
  <button @click="toggleDarkMode" class="btn">
    <img class="h-full w-full" src="./icons/dark_mode.svg"/>
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

