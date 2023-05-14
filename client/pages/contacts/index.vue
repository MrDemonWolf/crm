<script setup lang="ts">
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { gray, indigo } from "tailwindcss/colors";

import { useContactStore } from "@/stores/contact";

import { TrashIcon } from "@heroicons/vue/24/solid";

const isLoading = ref(true);
const filterStatusSelect = ref("lead");

const contacts = useContactStore();

const fetchContacts = async () => {
  await contacts.fetchContacts().then(() => {
    isLoading.value = false;
  });
};

const fetchMoreContacts = async () => {
  isLoading.value = true;
  await contacts.fetchMoreContacts().then(() => {
    isLoading.value = false;
  });
};

const onFilterStatusSelectChange = async (e: Event) => {
  isLoading.value = true;
  const filterStatusValue = (e.target as HTMLSelectElement).value;
  await contacts.fetchFilteredContacts(filterStatusValue as string);
  isLoading.value = false;
};
useHead({
  title: "Contacts",
  meta: [
    {
      name: "description",
      content:
        "Access a complete list of all users in your account, including their names, company, email address, and status.",
    },
  ],
});

onMounted(() => {
  fetchContacts();
});
</script>

<template>
  <div class="mx-auto max-w-7xl">
    <div class="py-10 bg-gray-900 vl-parent">
      <loading
        :active="isLoading"
        :is-full-page="false"
        :can-cancel="false"
        :loader="'dots'"
        :color="indigo[500]"
        :background-color="gray[500]"
        :opacity="0.5"
        :width="64"
        :height="64"
      />
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <div class="flex flex-col my-2 sm:flex-row">
              <div class="flex flex-row mb-1 sm:mb-0">
                <div class="relative">
                  <select
                    v-model="filterStatusSelect"
                    @change="onFilterStatusSelectChange"
                    class="block w-full h-full px-4 py-2 pr-8 leading-tight text-white bg-gray-600 border-t border-b border-r border-gray-800 rounded-r appearance-none sm:rounded-r-none sm:border-r-0 focus:outline-none focus:border-l focus:border-r focus:bg-gray-600 focus:border-gray-700"
                  >
                    <option value="all">All</option>
                    <option value="lead">Lead</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                  <div
                    class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-100 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              @click="contacts.showAddContactModal.value = true"
              class="block px-3 py-2 text-sm font-semibold text-center text-white bg-indigo-500 rounded-md hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Add contact
            </button>
          </div>
        </div>
        <div class="flow-root mt-8">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
            >
              <table class="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Company
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Status
                    </th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span class="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-800">
                  <tr v-for="contact in contacts.data" :key="contact['id']">
                    <td
                      class="py-4 pl-4 pr-3 text-sm font-medium text-white whitespace-nowrap sm:pl-0"
                    >
                      <NuxtLink :to="`/contacts/${contact.id}`">
                        {{ contact.firstName }} {{ contact.lastName }}
                      </NuxtLink>
                    </td>
                    <td
                      class="px-3 py-4 text-sm text-gray-300 whitespace-nowrap"
                    >
                      <NuxtLink
                        v-if="contact.company"
                        :to="`/companies/${contact.company.id}`"
                        class="text-indigo-400 hover:text-indigo-300"
                      >
                        {{ contact.company.name }}
                      </NuxtLink>
                      <span v-else>-</span>
                    </td>
                    <td
                      class="px-3 py-4 text-sm text-gray-300 whitespace-nowrap"
                    >
                      <a
                        :href="`mailto:${contact.email}`"
                        class="text-indigo-400 hover:text-indigo-300"
                      >
                        {{ contact.email }}
                      </a>
                    </td>
                    <td
                      class="px-3 py-4 text-sm text-gray-300 whitespace-nowrap"
                    >
                      <span
                        v-if="contact.status === 'lead'"
                        class="rounded-full bg-blue-50 px-2 py-1.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20"
                      >
                        Lead
                      </span>
                      <span
                        v-else-if="contact.status === 'proposal'"
                        class="rounded-full bg-yellow-50 px-2 py-1.5 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20"
                      >
                        Proposal
                      </span>
                      <span
                        v-if="contact.status === 'won'"
                        class="rounded-full bg-green-50 px-2 py-1.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                        >Won</span
                      >
                      <span
                        v-if="contact.status === 'lost'"
                        class="rounded-full bg-red-50 px-2 py-1.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20"
                        >Lost</span
                      >
                    </td>
                    <td
                      class="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0"
                    >
                      <a href="#" class="text-indigo-400 hover:text-indigo-300"
                        ><TrashIcon class="w-6 h-6 text-red-900" /><span
                          class="sr-only"
                          >Delete {{ contact.firstName }}</span
                        ></a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
              <nav
                class="flex items-center justify-between px-4 pt-3 border-t border-gray-200 sm:pt-6"
                aria-label="Pagination"
              >
                <div class="flex flex-1 sm:justify-end">
                  <button
                    v-if="!contacts.pagination.cursor"
                    @click.prevent="fetchContacts()"
                    class="relative inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-md ring-1 ring-inset ring-blue-600/20 hover:bg-indigo-400 focus-visible:outline-offset-0"
                  >
                    Back
                  </button>
                  <button
                    v-else
                    @click.prevent="fetchMoreContacts()"
                    class="relative inline-flex items-center px-3 py-2 ml-3 text-sm font-semibold text-white bg-indigo-500 rounded-md disabled:cursor-not-allowed ring-1 ring-inset ring-blue-600/20 hover:bg-indigo-400 focus-visible:outline-offset-0 disabled:bg-indigo-400"
                  >
                    Next
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ContactsCreateContact />
  <SharedAlertsSuccess />
</template>
