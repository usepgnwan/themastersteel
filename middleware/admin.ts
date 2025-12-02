export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('session_auth_steel')
    console.log(token)
  if (!token.value) {
    return navigateTo('/login')
  }
})