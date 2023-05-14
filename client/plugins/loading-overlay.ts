import { Component as Loading } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Loading", Loading);
});
