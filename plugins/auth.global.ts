import { jwtDecode } from "jwt-decode";

export default defineNuxtPlugin(()=>{
    const { sessionUser, BuyerSession} = useCookiedata();
    const decode = ref(null)
    const decode_buyer = ref(null)

    if(sessionUser.value){
        try{
            decode.value = jwtDecode(sessionUser.value)
        }catch(e){
             console.error('JWT decode error:', e)  
        }
    }
    
    if(BuyerSession.value){
        try{
            decode_buyer.value = jwtDecode(BuyerSession.value)
        }catch(e){
             console.error('JWT decode error:', e)  
        }
    }

    return {
        provide:{
            auth_user  : decode,
            auth_buyer  : decode_buyer,
        }
    }
})