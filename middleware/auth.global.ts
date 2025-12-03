export default defineNuxtRouteMiddleware((to) => { 
    const user = useCookie('session_auth_steel')   
    
    if(user.value !== undefined && (to.path ==='/login' || to.path ==='/registrasi') ){
        return navigateTo('/dashboard')
    }
})