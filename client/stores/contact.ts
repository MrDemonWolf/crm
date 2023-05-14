import { defineStore } from "pinia";

import { ContactWithCompany } from "../../server/db";

import { Contact, ContactStatus } from "@prisma/client";

type ContactStore = {
  data: ContactWithCompany[];
  total: number;
  pagination: {
    cursor: string;
  };
  contact: Contact | null;
  filter: {
    status: ContactStatus | null;
  };
  showAddContactModal: {
    value: boolean;
  };
  alert: {
    header: string;
    message: string;
    showSuccess: boolean;
    showError: boolean;
  };
};

export const useContactStore = defineStore("contacts", {
  state: () =>
    ({
      data: [],
      total: 0,
      pagination: {
        cursor: " ",
      },
      contact: null,
      filter: {
        status: null,
      },
      showAddContactModal: {
        value: false,
      },
      alert: {
        header: "",
        message: "",
        showSuccess: false,
        showError: false,
      },
    } as ContactStore),

  actions: {
    async fetchContacts(status: String | undefined = undefined) {
      const { contacts, total, pagination } = await fetch(
        `/api/contact?status=${status}`
      ).then((res) => res.json());
      this.data = contacts;
      this.total = total;
      this.pagination.cursor = pagination.cursor;
    },

    async fetchMoreContacts() {
      const { contacts, total, pagination } = await fetch(
        `/api/contact?cursor=${this.pagination.cursor}`
      ).then((res) => res.json());
      this.data = contacts;
      this.total = total;
      this.pagination.cursor = pagination.cursor;
    },

    async fetchContactById(id: string) {
      const contact = await fetch(`/api/contact/${id}`).then((res) =>
        res.json()
      );
      this.contact = contact;
    },

    // async addContact(contact: Contact) {
    // },

    // async updateContact(contact: Contact) {
    // },

    async deleteContact(id: string) {
      const { message } = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      }).then((res) => res.json());
      this.alert.header = "Success";
      this.alert.message = message;
      this.alert.showSuccess = true;
      this.alert.showError = false;

      // remove the contact from the store
      this.data = this.data.filter((contact) => contact.id !== id);
    },
  },
});
