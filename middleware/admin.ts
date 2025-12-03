import { jwtDecode } from "jwt-decode";

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('session_auth_steel')
  if (!token.value) {
    return navigateTo('/login')
  }
 
})