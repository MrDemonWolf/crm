import { defineStore } from "pinia";

import { ContactWithCompany } from "@/db";

enum ContactStatus {
  lead = "lead",
  proposal = "proposal",
  won = "won",
  lost = "lost",
}

type ContactStore = {
  data: ContactWithCompany[];
  total: number;
  pagination: {
    cursor: string;
  };
  contact: ContactWithCompany | null;
  filter: {
    status: ContactStatus | null;
  };
  showAddContactModal: {
    value: boolean;
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

    async fetchFilterContacts(status: String) {
      const { contacts, total, pagination, filter } = await fetch(
        `/api/contact?status=${status}`
      ).then((res) => res.json());
      this.data = contacts;
      this.total = total;
      this.pagination.cursor = pagination.cursor;
      this.filter;
    },
    async fetchMoreFilterContacts(status: String) {
      const { contacts, total, pagination, filter } = await fetch(
        `/api/contact?status=${status}&cursor=${this.pagination.cursor}`
      ).then((res) => res.json());
      this.data = contacts;
      this.total = total;
      this.pagination.cursor = pagination.cursor;
      this.filter;
    },
  },

  getters: {
    getContactById: (state) => (id: string) =>
      state.data.find((contact) => contact.id === id),
  },
});
