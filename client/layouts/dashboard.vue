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
      <h1 class="sr-only">Page title</h1>
      <!-- Main 3 column grid -->
      <div class="grid items-start grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <!-- Left column -->
        <div class="grid grid-cols-1 gap-4 lg:col-span-2">
          <section aria-labelledby="status-title">
            <h2 class="sr-only" id="status-title">Status</h2>
            <div class="overflow-hidden bg-white rounded-lg shadow">
              <div class="p-8">
                <slot />
              </div>
            </div>
          </section>
        </div>

        <!-- Right column -->
        <div class="grid grid-cols-1 gap-4">
          <section aria-labelledby="recent-Aativity-title">
            <h2 class="sr-only" id="recent-activity-title">Recent activity</h2>
            <div class="overflow-hidden bg-white rounded-lg shadow">
              <div class="p-4">
                <DashboardActivityFeed />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
  <SharedFooter />
</template>
