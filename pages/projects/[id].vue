<template>
  <h1>Contact {{ route.params.id }}</h1>

  This will have the project title, due date and task list
</template>

<script setup lang="ts">
// get the id from params using
const route = useRoute();

useHead({
  title: `Contact ${route.params.id}`,
  meta: [
    {
      hid: "description",
      name: "description",
      content: `Contact ${route.params.id} description`,
    },
  ],
});
</script>
