// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/docs/getting-started/seo-meta
  app: {
    head: {
      titleTemplate: "CRM: %s",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width,initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "MrDemonWolf, Inc. is a company that provides services to the public.",
        },
        { hid: "og:title", property: "og:title", content: "MrDemonWolf, Inc." },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "MrDemonWolf, Inc. is a company that provides services to the public.",
        },
        {
          hid: "og:image",
          property: "og:image",
          content:
            "https://mrdemonwolf.github.io/mrdemonwolf-inc/assets/images/og-image.png",
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: "MrDemonWolf, Inc.",
        },
        { hid: "og:image:width", property: "og:image:width", content: "1200" },
        { hid: "og:image:height", property: "og:image:height", content: "630" },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://mrdemonwolf.github.io/mrdemonwolf-inc/",
        },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "twitter:card",
          property: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:title",
          property: "twitter:title",
          content: "MrDemonWolf, Inc.",
        },
        {
          hid: "twitter:description",
          property: "twitter:description",
          content:
            "MrDemonWolf, Inc. is a company that provides services to the public.",
        },
        {
          hid: "twitter:image",
          property: "twitter:image",
          content:
            "https://mrdemonwolf.github.io/mrdemonwolf-inc/assets/images/og-image.png",
        },
        {
          hid: "twitter:image:alt",
          property: "twitter:image:alt",
          content: "MrDemonWolf, Inc.",
        },
        {
          hid: "twitter:url",
          property: "twitter:url",
          content: "https://mrdemonwolf.github.io/mrdemonwolf-inc/",
        },
      ],
    },
  },

  css: ["~/assets/css/main.css"],

  // https://nuxtjs.org/docs/3.x/configuration-glossary/configuration-build#postcss
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-modules
  modules: [
    "@nuxt/image-edge",
    "@nuxtjs/tailwindcss",
    "nuxt-headlessui",
    "@pinia/nuxt",
  ],

  // https://tailwindcss.nuxtjs.org/
  tailwindcss: {},

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build
  runtimeConfig: {},
});
