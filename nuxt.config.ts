// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
    },
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@vee-validate/nuxt'],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },
  pinia: {
    autoImports: ['defineStore'],
    storesDirs: ['./stores'],
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VForm',
      Field: 'VField',
      FieldArray: 'VFieldArray',
      ErrorMessage: 'VErrorMessage',
    },
  },
  imports: {
    dirs: [
      './stores',
      './middleware',
      './plugins',
      './composables',
      './components',
    ],
  },
});
