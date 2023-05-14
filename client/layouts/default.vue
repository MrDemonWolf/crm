<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "bg-gray-600",
  },
});
</script>

<template>
  <SharedNavigation />
  <main class="-mt-32">
    <div class="px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <slot />
    </div>
  </main>

  <SharedFooter />
</template>
