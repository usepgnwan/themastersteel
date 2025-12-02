export default defineNuxtRouteMiddleware((to) => { 
    const user = useCookie('session_auth_steel')   
    
    if(user.value !== undefined && to.path ==='/'){
        return navigateTo('/dashboard')
    }
})