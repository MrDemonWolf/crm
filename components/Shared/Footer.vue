<template>
  <footer class="py-4 mx-auto overflow-hidden max-w-7xl">
    <p class="leading-5 text-center text-white">
      &copy; {{ currentYear }} MrDemonWolf, Inc. All rights reserved.
    </p>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
