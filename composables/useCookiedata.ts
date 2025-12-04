export const useCookiedata = (days : number = 1) => { 
    let maxAge = 60 * 60 * 24 * days; 
    const sessionUser = useCookie<any>('session_auth_steel', { maxAge : maxAge });
    function clearDataCookie() {
        sessionUser.value = null; 
    }

    const BuyerSession  = useCookie<any>('session_buyer_steel', { maxAge : maxAge });
    return {
        sessionUser, 
        clearDataCookie,
        BuyerSession
    };
}