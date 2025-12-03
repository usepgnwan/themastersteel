// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/image', '@nuxt/ui', '@nuxt/icon'],
  css: ['~/assets/css/main.css','~/assets/css/nprogress.css'],
  ui:{
    colorMode:false,
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