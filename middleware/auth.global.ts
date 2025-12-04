export default defineNuxtRouteMiddleware((to) => { 
    // const user = useCookie('session_auth_steel') 
    
    const { sessionUser, BuyerSession} = useCookiedata();  
    
    if(sessionUser.value !== undefined && (to.path ==='/login' || to.path ==='/registrasi') ){
        return navigateTo('/dashboard')
    }

    if(BuyerSession.value !== undefined && (to.path ==='/login' || to.path ==='/registrasi') ){
        return navigateTo('/')
    }
})