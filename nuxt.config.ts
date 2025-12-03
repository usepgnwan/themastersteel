// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/image', '@nuxt/ui', '@nuxt/icon'],
  css: ['~/assets/css/main.css','~/assets/css/nprogress.css'],
  ui:{
    colorMode:false,
  },
 
  runtimeConfig: {
    public: {
      secretForm: process.env.PUBLIC_SECRET_FORM,
      BASE_URL: process.env.BASE_URL,
      APP_ENV: process.env.APP_ENV,
    },
    BASE_API_MAIN_URL: process.env.BASE_API_MAIN_URL, 
    SECRET_API_MAIN_KEY: process.env.SECRET_API_MAIN_KEY, 
    SECRET_TOKEN_KEY: process.env.SECRET_TOKEN_KEY, 
  },
  vite:{
      build: {
        rollupOptions: {
            output: {
            manualChunks: {
              vendor: ['vue', 'vue-router', '@vueuse/core' ]
            }
          },
        },
        chunkSizeWarningLimit: 2000,
        sourcemap: false,
        commonjsOptions: {
          transformMixedEsModules: true,
        },
      }, 

  },
  build:{ 
        analyze: false,
  },
})