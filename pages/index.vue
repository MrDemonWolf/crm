<template>
  <div class="pb-8 border-b-2 border-black/5">
    <h3 class="text-base font-semibold leading-6 text-gray-900">
      Last 30 days
    </h3>

    <dl class="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="item in stats"
        :key="item.id"
        class="relative px-4 pt-5 pb-12 overflow-hidden bg-white rounded-lg shadow sm:px-6 sm:pt-6"
      >
        <dt>
          <div class="absolute p-3 bg-indigo-500 rounded-md">
            <component
              :is="item.icon"
              class="w-6 h-6 text-white"
              aria-hidden="true"
            />
          </div>
          <p class="ml-16 text-sm font-medium text-gray-500 truncate">
            {{ item.name }}
          </p>
        </dt>
        <dd class="flex items-baseline pb-6 ml-16 sm:pb-7">
          <p class="text-2xl font-semibold text-gray-900">{{ item.stat }}</p>
          <p
            :class="[
              item.changeType === 'increase'
                ? 'text-green-600'
                : 'text-red-600',
              'ml-2 flex items-baseline text-sm font-semibold',
            ]"
          >
            <ArrowUpIcon
              v-if="item.changeType === 'increase'"
              class="self-center flex-shrink-0 w-5 h-5 text-green-500"
              aria-hidden="true"
            />
            <ArrowDownIcon
              v-else
              class="self-center flex-shrink-0 w-5 h-5 text-red-500"
              aria-hidden="true"
            />
            <span class="sr-only">
              {{ item.changeType === "increase" ? "Increased" : "Decreased" }}
              by
            </span>
            {{ item.change }}
          </p>
          <div class="absolute inset-x-0 bottom-0 px-4 py-4 bg-gray-50 sm:px-6">
            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
                >View all<span class="sr-only"> {{ item.name }} stats</span></a
              >
            </div>
          </div>
        </dd>
      </div>
    </dl>
  </div>
  <div class="pb-8 my-2 border-b-2 border-black/5">
    <h3 class="text-base font-semibold leading-6 text-gray-900">
      Last 60 days
    </h3>

    <dl class="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="item in stats"
        :key="item.id"
        class="relative px-4 pt-5 pb-12 overflow-hidden bg-white rounded-lg shadow sm:px-6 sm:pt-6"
      >
        <dt>
          <div class="absolute p-3 bg-indigo-500 rounded-md">
            <component
              :is="item.icon"
              class="w-6 h-6 text-white"
              aria-hidden="true"
            />
          </div>
          <p class="ml-16 text-sm font-medium text-gray-500 truncate">
            {{ item.name }}
          </p>
        </dt>
        <dd class="flex items-baseline pb-6 ml-16 sm:pb-7">
          <p class="text-2xl font-semibold text-gray-900">{{ item.stat }}</p>
          <p
            :class="[
              item.changeType === 'increase'
                ? 'text-green-600'
                : 'text-red-600',
              'ml-2 flex items-baseline text-sm font-semibold',
            ]"
          >
            <ArrowUpIcon
              v-if="item.changeType === 'increase'"
              class="self-center flex-shrink-0 w-5 h-5 text-green-500"
              aria-hidden="true"
            />
            <ArrowDownIcon
              v-else
              class="self-center flex-shrink-0 w-5 h-5 text-red-500"
              aria-hidden="true"
            />
            <span class="sr-only">
              {{ item.changeType === "increase" ? "Increased" : "Decreased" }}
              by
            </span>
            {{ item.change }}
          </p>
          <div class="absolute inset-x-0 bottom-0 px-4 py-4 bg-gray-50 sm:px-6">
            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
                >View all<span class="sr-only"> {{ item.name }} stats</span></a
              >
            </div>
          </div>
        </dd>
      </div>
    </dl>
  </div>
  <div>
    <h3 class="text-base font-semibold leading-6 text-gray-900">
      Last 90 days
    </h3>

    <dl class="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="item in stats"
        :key="item.id"
        class="relative px-4 pt-5 pb-12 overflow-hidden bg-white rounded-lg shadow sm:px-6 sm:pt-6"
      >
        <dt>
          <div class="absolute p-3 bg-indigo-500 rounded-md">
            <component
              :is="item.icon"
              class="w-6 h-6 text-white"
              aria-hidden="true"
            />
          </div>
          <p class="ml-16 text-sm font-medium text-gray-500 truncate">
            {{ item.name }}
          </p>
        </dt>
        <dd class="flex items-baseline pb-6 ml-16 sm:pb-7">
          <p class="text-2xl font-semibold text-gray-900">{{ item.stat }}</p>
          <p
            :class="[
              item.changeType === 'increase'
                ? 'text-green-600'
                : 'text-red-600',
              'ml-2 flex items-baseline text-sm font-semibold',
            ]"
          >
            <ArrowUpIcon
              v-if="item.changeType === 'increase'"
              class="self-center flex-shrink-0 w-5 h-5 text-green-500"
              aria-hidden="true"
            />
            <ArrowDownIcon
              v-else
              class="self-center flex-shrink-0 w-5 h-5 text-red-500"
              aria-hidden="true"
            />
            <span class="sr-only">
              {{ item.changeType === "increase" ? "Increased" : "Decreased" }}
              by
            </span>
            {{ item.change }}
          </p>
          <div class="absolute inset-x-0 bottom-0 px-4 py-4 bg-gray-50 sm:px-6">
            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
                >View all<span class="sr-only"> {{ item.name }} stats</span></a
              >
            </div>
          </div>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup>
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/vue/20/solid";
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";

definePageMeta({
  layout: "dashboard",
});

useHead({
  title: "Dashboard",
});

const stats = [
  {
    id: 1,
    name: "New Contacts",
    stat: "160",
    icon: UsersIcon,
    change: "60",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Total Wins",
    stat: "58.16%",
    icon: EnvelopeOpenIcon,
    change: "5.4%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Total Losts",
    stat: "24.57%",
    icon: CursorArrowRaysIcon,
    change: "3.2%",
    changeType: "decrease",
  },
];
</script>
