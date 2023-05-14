<script setup lang="ts">
// get the id from params using
const route = useRoute();
</script>

<template>
  <h1>Contact {{ route.params.id }}</h1>
</template>
