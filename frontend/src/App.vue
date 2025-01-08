<script setup lang="ts">
import {  RouterView } from 'vue-router'
import { applySavedTheme } from './utils/theme';

applySavedTheme();
</script>

<template>
  <RouterView />
</template>



