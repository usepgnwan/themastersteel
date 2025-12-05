export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('session_buyer_steel')
  if (!token.value) {
    return navigateTo('/login')
  }
 
})