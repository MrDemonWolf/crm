import { defineStore } from "pinia";

import { CompanyWithAddressAndContacts, CompanyWithContacts } from "@/db";

type CompanyStore = {
  data: CompanyWithAddressAndContacts[];
  total: number;
  pagination: {
    cursor: string;
  };
  unlinked: CompanyWithContacts[];
  showAddCompanyModal: {
    value: boolean;
  };
  alert: {
    header: string;
    message: string;
    showSuccess: boolean;
    showError: boolean;
  };
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
      showAddCompanyModal: {
        value: false,
      },
      alert: {
        header: "",
        message: "",
        showSuccess: false,
        showError: false,
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

    async fetchUnlinkedCompanies() {
      const { companies } = await fetch("/api/company/unlinked").then((res) =>
        res.json()
      );
      this.unlinked = companies;
    },

    // async createCompany(company: CompanyWithAddressAndContacts) {
    //   const res = await fetch("/api/company", {
    //     method: "POST",
    //     body: JSON.stringify(company),
    //   });
    //   if (res.ok) {
    //     this.data = [...this.data, company];
    //   }
    // }

    async deleteCompany(id: String) {
      const { message } = await fetch(`/api/company/${id}`, {
        method: "DELETE",
      }).then((res) => res.json());
      this.alert.header = "Success";
      this.alert.message = message;
      this.alert.showSuccess = true;
      this.alert.showError = false;

      // remove the contact from the store
      this.data = this.data.filter((company) => company.id !== id);
    },
  },
});
