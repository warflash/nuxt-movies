const isDev = process.env.NODE_ENV === "development";

// const apiBaseUrl = 'http://localhost:3001'
const apiBaseUrl = "https://movies-proxy.vercel.app";

export default defineNuxtConfig({
  modules: ["@vueuse/nuxt", "@unocss/nuxt", "@pinia/nuxt", "@nuxt/image-edge"],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  routeRules: {
    "/**": isDev ? {} : { cache: { swr: true, headersOnly: true } },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl,
    },
  },
  app: {
    pageTransition: false,
    layoutTransition: false,
  },
  image: {
    provider: "proxy",
    providers: {
      proxy: {
        provider: "ipx",
        options: {
          baseURL: `${apiBaseUrl}/ipx`,
        },
      },
    },
  },
});
