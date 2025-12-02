import { defineNuxtPlugin } from '#app'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default defineNuxtPlugin((nuxtApp) => {
  // Konfigurasi opsional
  NProgress.configure({ showSpinner: false })

  nuxtApp.hook('page:start', () => {
    NProgress.start()
  })

  nuxtApp.hook('page:finish', () => {
    NProgress.done()
  })
})
