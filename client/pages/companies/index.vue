<script setup lang="ts">
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { gray, indigo } from "tailwindcss/colors";

import { useCompanyStore } from "~/stores/company";

import { TrashIcon } from "@heroicons/vue/24/solid";

const isLoading = ref(true);

const companies = useCompanyStore();

const fetchCompanies = async () => {
  await companies.fetchCompanies().then(() => {
    isLoading.value = false;
  });
};

const fetchMoreCompanies = async () => {
  isLoading.value = true;
  await companies.fetchMoreCompanies().then(() => {
    isLoading.value = false;
  });
};

const deleteCompany = async (id: string) => {
  isLoading.value = true;
  await companies.deleteCompany(id).then(() => {
    isLoading.value = false;
  });
};

useHead({
  title: "Companies",
  meta: [
    {
      name: "description",
      content:
        "Access a complete list of all companies in your account, including their name, address, and contact.",
    },
  ],
});

onMounted(() => {
  fetchCompanies();
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
            <h1 class="text-base font-semibold leading-6 text-white">
              Companies
            </h1>
            <p class="mt-2 text-sm text-gray-300">
              Access a complete list of all companies in your account, including
              their name, address, and contact.
            </p>
          </div>
          <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              class="block px-3 py-2 text-sm font-semibold text-center text-white bg-indigo-500 rounded-md hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Add company
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
                      Address
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Website
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Contact
                    </th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-800">
                  <tr v-for="company in companies.data" :key="company['id']">
                    <td
                      class="py-4 pl-4 pr-3 text-sm font-medium text-white whitespace-nowrap sm:pl-0"
                    >
                      <NuxtLink :to="`/companies/${company.id}`">
                        {{ company.name }}
                      </NuxtLink>
                    </td>
                    <td
                      class="px-3 py-4 text-sm text-gray-300 whitespace-nowrap"
                    >
                      <a
                        v-if="company.address"
                        :href="`https://maps.apple.com/?q=${company.address.streetAddress} ${company.address.city} ${company.address.state} ${company.address.zipCode}`"
                        class="text-indigo-400 hover:text-indigo-300"
                      >
                        {{ company.address.streetAddress }}
                        {{ company.address.city }}
                        {{ company.address.state }}
                        {{ company.address.zipCode }}
                      </a>
                      <span v-else>-</span>
                    </td>
                    <td
                      class="px-3 py-4 text-sm text-gray-300 whitespace-nowrap"
                    >
                      <a
                        :href="company.website"
                        class="text-indigo-400 hover:text-indigo-300"
                      >
                        {{ company.website }}
                      </a>
                    </td>
                    <td
                      class="px-3 py-4 text-sm text-gray-300 whitespace-nowrap"
                    >
                      <span
                        v-if="company.contact"
                        class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                      >
                        {{ company.contact.firstName }}
                        {{ company.contact.lastName }}
                      </span>
                      <a
                        v-else
                        href="#"
                        class="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full"
                      >
                        Link contact
                      </a>
                    </td>
                    <td
                      class="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0"
                    >
                      <button
                        role="button"
                        @click.prevent="deleteCompany(company.id)"
                        class="text-indigo-400 hover:text-indigo-300"
                      >
                        <TrashIcon class="w-6 h-6 text-red-900" /><span
                          class="sr-only"
                          >Delete {{ company.name }}</span
                        >
                      </button>
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
                    v-if="!companies.pagination.cursor"
                    @click.prevent="fetchCompanies()"
                    class="relative inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-md ring-1 ring-inset ring-blue-600/20 hover:bg-indigo-400 focus-visible:outline-offset-0"
                  >
                    Back
                  </button>
                  <button
                    v-else
                    @click.prevent="fetchMoreCompanies()"
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
  <SharedAlertsSuccess />
</template>
