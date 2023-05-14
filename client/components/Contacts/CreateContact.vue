<script setup lang="ts">
import { useContactStore } from "@/stores/contact";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { create } from "domain";

const contact = useContactStore();

const createContactData = ref({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
});

const createContactErrors = ref({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
});

const createContact = async (newContact: any) => {
  try {
    const { data, pending, error, refresh } = await useFetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        firstName: newContact.firstName,
        lastName: newContact.lastName,
        email: newContact.email,
        phoneNumber: newContact.phoneNumber,
      }),
    });

    if (error.value) {
      console.log(error.value.data.errors);
      createContactErrors.value.firstName = error.value.data.errors.firstName;
      createContactErrors.value.lastName = error.value.data.errors.lastName;
      createContactErrors.value.email = error.value.data.errors.email;
      createContactErrors.value.phoneNumber =
        error.value.data.errors.phoneNumber;

      return;
    }

    contact.showAddContactModal.value = false;
    contact.fetchContacts();

    /**
     * Toast Notification
     */
    setTimeout(() => {
      contact.alert.header = "Success!";
      contact.alert.message = "Contact created successfully.";
      contact.alert.showSuccess = true;
      contact.alert.showError = false;
    }, 250);
  } catch (err) {
    /**
     * Toast Notification
     */
    setTimeout(() => {
      contact.alert.header = "Error!";
      contact.alert.message = "Unkown error occurred. Try again later.";
      contact.alert.showSuccess = false;
      contact.alert.showError = true;
    }, 250);
  }
};
</script>

<template>
  <TransitionRoot as="template" :show="contact.showAddContactModal.value">
    <Dialog
      as="div"
      class="relative z-10"
      @close="contact.showAddContactModal.value = false"
    >
      <div class="fixed inset-0" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none sm:pl-16"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="w-screen max-w-md pointer-events-auto">
                <form
                  class="flex flex-col h-full overflow-y-scroll bg-gray-900 shadow-xl"
                  @submit.prevent="createContact(createContactData)"
                >
                  <div class="flex-1">
                    <div class="px-4 py-6 bg-gray-600 sm:px-6">
                      <div class="flex items-start justify-between space-x-3">
                        <div class="space-y-1">
                          <DialogTitle
                            class="text-base font-semibold leading-6 text-white"
                            >Create a new contact</DialogTitle
                          >
                          <p class="text-sm text-gray-100">
                            Get started by filling in the information below to
                            create a new contact for your CRM
                          </p>
                        </div>
                        <div class="flex items-center h-7">
                          <button
                            type="button"
                            class="text-gray-100 hover:text-gray-200"
                            @click="contact.showAddContactModal.value = false"
                          >
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="w-6 h-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      class="py-6 space-y-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0"
                    >
                      <div class="p-12 px-4 sm:px-6 sm:py-5">
                        <div class="my-3 sm:my-6">
                          <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-white"
                            >First name</label
                          >
                          <div class="mt-2">
                            <input
                              type="text"
                              name="first-name"
                              id="first-name"
                              autocomplete="given-name"
                              v-model="createContactData.firstName"
                              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <p
                            v-if="createContactErrors.firstName !== ''"
                            class="mt-2 text-sm text-red-600"
                            id="first-name-error"
                          >
                            {{ createContactErrors.firstName }}
                          </p>
                        </div>

                        <div class="my-3 sm:my-6">
                          <label
                            for="last-name"
                            class="block text-sm font-medium leading-6 text-white"
                            >Last name</label
                          >
                          <div class="mt-2">
                            <input
                              type="text"
                              name="last-name"
                              id="last-name"
                              autocomplete="family-name"
                              v-model="createContactData.lastName"
                              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                            <p
                              v-if="createContactErrors.lastName !== ''"
                              class="mt-2 text-sm text-red-600"
                              id="last-name-error"
                            >
                              {{ createContactErrors.lastName }}
                            </p>
                          </div>
                        </div>

                        <div class="my-3 sm:my-6">
                          <label
                            for="email"
                            class="block text-sm font-medium leading-6 text-white"
                            >Email address</label
                          >
                          <div class="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autocomplete="email"
                              v-model="createContactData.email"
                              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <p
                            v-if="createContactErrors.email !== ''"
                            class="mt-2 text-sm text-red-600"
                            id="email-error"
                          >
                            {{ createContactErrors.email }}
                          </p>
                        </div>
                        <div class="my-3 sm:my-6">
                          <label
                            for="phone-number"
                            class="block text-sm font-medium leading-6 text-white"
                            >Phone number</label
                          >
                          <div class="mt-2">
                            <input
                              id="phone-number"
                              name="phone-number"
                              type="tel"
                              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                              autocomplete="phone-number"
                              v-model="createContactData.phoneNumber"
                              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <p
                            v-if="createContactErrors.phoneNumber !== ''"
                            class="mt-2 text-sm text-red-600"
                            id="phone-number-error"
                          >
                            {{ createContactErrors.phoneNumber }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6"
                  >
                    <div class="flex justify-end space-x-3">
                      <button
                        type="button"
                        class="px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        @click="contact.showAddContactModal.value = false"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        class="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
