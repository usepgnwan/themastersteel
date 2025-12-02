export const useCookiedata = (days : number = 1) => {
    console.log(days)
    let maxAge = 60 * 60 * 24 * days; 
    const sessionUser = useCookie<any>('session_auth_steel', { maxAge : maxAge });
    console.log(sessionUser)
    function clearDataCookie() {
        sessionUser.value = null;
        
    }

    return {
        sessionUser, 
        clearDataCookie
    };
}