<script setup lang="ts">
import { PaperClipIcon } from "@heroicons/vue/20/solid";

// get the id from params using
const route = useRoute();
</script>

<template>
  <div class="px-4 sm:px-0">
    <h3 class="text-base font-semibold leading-7 text-gray-900">
      Applicant Information
    </h3>
    <p class="max-w-2xl mt-1 text-sm leading-6 text-gray-500">
      Personal details and application.
    </p>
  </div>
  <div class="mt-6 border-t border-gray-100">
    <dl class="divide-y divide-gray-100">
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">Full name</dt>
        <dd
          class="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
        >
          <span class="flex-grow">Margot Foster</span>
          <span class="flex-shrink-0 ml-4">
            <button
              type="button"
              class="font-medium text-indigo-600 bg-white rounded-md hover:text-indigo-500"
            >
              Update
            </button>
          </span>
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">
          Application for
        </dt>
        <dd
          class="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
        >
          <span class="flex-grow">Backend Developer</span>
          <span class="flex-shrink-0 ml-4">
            <button
              type="button"
              class="font-medium text-indigo-600 bg-white rounded-md hover:text-indigo-500"
            >
              Update
            </button>
          </span>
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">
          Email address
        </dt>
        <dd
          class="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
        >
          <span class="flex-grow">margotfoster@example.com</span>
          <span class="flex-shrink-0 ml-4">
            <button
              type="button"
              class="font-medium text-indigo-600 bg-white rounded-md hover:text-indigo-500"
            >
              Update
            </button>
          </span>
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">
          Salary expectation
        </dt>
        <dd
          class="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
        >
          <span class="flex-grow">$120,000</span>
          <span class="flex-shrink-0 ml-4">
            <button
              type="button"
              class="font-medium text-indigo-600 bg-white rounded-md hover:text-indigo-500"
            >
              Update
            </button>
          </span>
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">About</dt>
        <dd
          class="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
        >
          <span class="flex-grow"
            >Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
            incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
            consequat sint. Sit id mollit nulla mollit nostrud in ea officia
            proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit
            deserunt qui eu.</span
          >
          <span class="flex-shrink-0 ml-4">
            <button
              type="button"
              class="font-medium text-indigo-600 bg-white rounded-md hover:text-indigo-500"
            >
              Update
            </button>
          </span>
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <ul
            role="list"
            class="border border-gray-200 divide-y divide-gray-100 rounded-md"
          >
            <li
              class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
            >
              <div class="flex items-center flex-1 w-0">
                <PaperClipIcon
                  class="flex-shrink-0 w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
                <div class="flex flex-1 min-w-0 gap-2 ml-4">
                  <span class="font-medium truncate"
                    >resume_back_end_developer.pdf</span
                  >
                  <span class="flex-shrink-0 text-gray-400">2.4mb</span>
                </div>
              </div>
              <div class="flex flex-shrink-0 ml-4 space-x-4">
                <button
                  type="button"
                  class="font-medium text-indigo-600 bg-white rounded-md hover:text-indigo-500"
                >
                  Update
                </button>
                <span class="text-gray-200" aria-hidden="true">|</span>
                <button
                  type="button"
                  class="font-medium text-gray-900 bg-white rounded-md hover:text-gray-800"
                >
                  Remove
                </button>
              </div>
            </li>
            <li
              class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
            >
              <div class="flex items-center flex-1 w-0">
                <PaperClipIcon
                  class="flex-shrink-0 w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
                <div class="flex flex-1 min-w-0 gap-2 ml-4">
                  <span class="font-medium truncate"
                    >coverletter_back_end_developer.pdf</span
                  >
                  <span class="flex-shrink-0 text-gray-400">4.5mb</span>
                </div>
              </div>
              <div class="flex flex-shrink-0 ml-4 space-x-4">
                <button
                  type="button"
                  class="font-medium text-indigo-600 bg-white rounded-md hover:text-indigo-500"
                >
                  Update
                </button>
                <span class="text-gray-200" aria-hidden="true">|</span>
                <button
                  type="button"
                  class="font-medium text-gray-900 bg-white rounded-md hover:text-gray-800"
                >
                  Remove
                </button>
              </div>
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </div>
</template>
