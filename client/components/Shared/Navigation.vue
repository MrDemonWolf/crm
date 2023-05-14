<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import {
  BanknotesIcon,
  Bars3Icon,
  BriefcaseIcon,
  ClipboardIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  { name: "Contacts", href: "/contacts", icon: UsersIcon, current: false },
  {
    name: "Companies",
    href: "/companies",
    icon: BriefcaseIcon,
    current: false,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: ClipboardIcon,
    current: false,
  },
];

/**
 * Set the current navigation item based on the current route.
 */
navigation.forEach((item) => {
  item.current = route.path === item.href;
});

/*
 *  Get current navigation item
 */
const current = computed(() => {
  return navigation.find((item) => item.current);
});
</script>

<template>
  <div class="pb-32 bg-gray-800">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="border-b border-gray-700">
          <div class="flex items-center justify-between h-16 px-4 sm:px-0">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <NuxtImg class="h-8 w-36" src="/images/logo.svg" />
              </div>
              <div class="hidden md:block">
                <div class="flex items-baseline ml-10 space-x-4">
                  <a
                    v-for="item in navigation"
                    :key="item.name"
                    :href="item.href"
                    :class="[
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium inline-flex items-center',
                    ]"
                    :aria-current="item.current ? 'page' : undefined"
                  >
                    <component
                      :is="item.icon"
                      :class="[
                        item.current
                          ? 'text-white'
                          : 'text-indigo-200 group-hover:text-white',
                        'h-4 w-4 mr-2',
                      ]"
                      aria-hidden="true"
                    />
                    {{ item.name }}</a
                  >
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="flex items-center ml-4 md:ml-6">
                <a
                  role="button"
                  href="https://billing.mrdemonwolf.com"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <BanknotesIcon
                    class="w-5 h-5 mr-2 -ml-1"
                    aria-hidden="true"
                  />
                  <span>Go to billing dashboard</span>
                </a>
              </div>
            </div>

            <div class="flex -mr-2 md:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton
                class="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="sr-only">Open main menu</span>
                <Bars3Icon
                  v-if="!open"
                  class="block w-6 h-6"
                  aria-hidden="true"
                />
                <XMarkIcon v-else class="block w-6 h-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel class="border-b border-gray-700 md:hidden">
        <div class="px-2 py-3 space-y-1 sm:px-3">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="nuxt-link"
            :href="item.href"
            :class="[
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium',
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
          <DisclosureButton
            as="a"
            href="https://billing.mrdemonwolf.com"
            class="block px-3 py-2 text-base font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-700 hover:text-white"
            >Go to billing
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>
