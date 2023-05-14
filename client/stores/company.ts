import { defineStore } from "pinia";

import { CompanyWithAddressAndContacts, CompanyWithContacts } from "@/db";

type CompanyStore = {
  data: CompanyWithAddressAndContacts[];
  total: number;
  pagination: {
    cursor: string;
  };
  unlinked: CompanyWithContacts[];
};

export const useCompanyStore = defineStore("company", {
  state: () =>
    ({
      data: [],
      total: 0,
      pagination: {
        cursor: " ",
      },
      unlinked: [],
    } as CompanyStore),

  actions: {
    async fetchCompanies() {
      const { companies, total, pagination } = await fetch("/api/company").then(
        (res) => res.json()
      );
      this.data = companies;
      this.total = total;
      this.pagination.cursor = pagination.cursor;
    },
    async fetchMoreCompanies() {
      const { companies, total, pagination } = await fetch(
        `/api/company?cursor=${this.pagination.cursor}`
      ).then((res) => res.json());
      this.data = [...this.data, ...companies];
      this.total = total;
      this.pagination.cursor = pagination.cursor;
    },

    async fetchUnlinkedCompanies() {
      const { companies } = await fetch("/api/company/unlinked").then((res) =>
        res.json()
      );
      this.unlinked = companies;
    },
  },
});
