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
    async fetchContacts() {
      // onluy set data from contacts and set the total and cursor
      const { contacts, total, pagination } = await fetch("/api/contact").then(
        (res) => res.json()
      );
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

    async fetchFilteredContacts(status: String) {
      const { contacts, total, pagination } = await fetch(
        `/api/contact?status=${status}`
      ).then((res) => res.json());
      this.data = contacts;
      this.total = total;
      this.pagination.cursor = pagination.cursor;
    },
  },
});
