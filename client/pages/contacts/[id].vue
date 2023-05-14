<script setup lang="ts">
import { ContactWithCompany } from "~/../server/db";

// get the id from params using
const route = useRoute();

const contact = ref<ContactWithCompany>();

const error = useError();

useHead({
  title: computed(
    () =>
      `Editing: ${contact.value?.firstName} ${contact.value?.lastName?.charAt(
        0
      )}.`
  ),
});

onMounted(async () => {
  const response = await fetch(`/api/contact/${route.params.id}`);
  if (response.status !== 200) {
    error.value = await response.json();
    return;
  }
  contact.value = (await response.json()).contact;
});
</script>

<template>
  <div class="py-10 mx-auto bg-gray-900 max-w-7xl">
    <div class="py-2 sm:px-6 lg:px-8">
      <h3 class="text-base font-semibold leading-7 text-white">
        {{ contact?.firstName }} {{ contact?.lastName }}
      </h3>

      <div class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-white">Full name</dt>
            <dd
              class="flex mt-1 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0"
            >
              <span class="flex-grow"
                >{{ contact?.firstName }} {{ contact?.lastName }}</span
              >
              <span class="flex-shrink-0 ml-4">
                <button
                  type="button"
                  class="font-medium text-indigo-600 bg-white rounded-md hover:text-indigo-500 py-0.5 px-1"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-white">Email</dt>
            <dd
              class="flex mt-1 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0"
            >
              <span class="flex-grow">{{ contact?.email }}</span>
              <span class="flex-shrink-0 ml-4">
                <button
                  type="button"
                  class="font-medium text-indigo-600 bg-white rounded-md hover:text-indigo-500 py-0.5 px-1"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-white">Company</dt>
            <dd
              class="flex mt-1 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0"
            >
              <span class="flex-grow">{{
                contact?.company?.name || "N/A"
              }}</span>
              <span class="flex-shrink-0 ml-4">
                <button
                  type="button"
                  class="font-medium text-indigo-600 bg-white rounded-md hover:text-indigo-500 py-0.5 px-1"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-white">
              Phone number
            </dt>
            <dd
              class="flex mt-1 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0"
            >
              <span class="flex-grow">{{ contact?.phoneNumber || "N/A" }}</span>
              <span class="flex-shrink-0 ml-4">
                <button
                  type="button"
                  class="font-medium text-indigo-600 bg-white rounded-md hover:text-indigo-500 py-0.5 px-1"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <nav
      class="flex items-center justify-between px-4 pt-3 border-t border-gray-200 sm:pt-6"
    >
      <div class="flex flex-1 sm:justify-end">
        <nuxt-link
          to="/contacts"
          class="relative inline-flex items-center px-3 py-2 ml-3 text-sm font-semibold text-white bg-indigo-500 rounded-md disabled:cursor-not-allowed ring-1 ring-inset ring-blue-600/20 hover:bg-indigo-400 focus-visible:outline-offset-0 disabled:bg-indigo-400"
        >
          Back to contacts
        </nuxt-link>
      </div>
    </nav>
  </div>
</template>
