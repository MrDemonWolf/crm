import { defineStore } from "pinia";

// import { ContactWithCompany } from "@/db";

import { CompanyWithAddressAndContacts } from "@/db";

type CompanyStore = {
  data: CompanyWithAddressAndContacts[];
  total: number;
  pagination: {
    cursor: string;
  };
};

export const useCompaniesStore = defineStore("companies", {
  state: () =>
    ({
      data: [],
      total: 0,
      pagination: {
        cursor: " ",
      },
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
  },
});
