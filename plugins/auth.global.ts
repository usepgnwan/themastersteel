import { jwtDecode } from "jwt-decode";

export default defineNuxtPlugin(()=>{
    const { sessionUser } = useCookiedata();
    const decode = ref(null)

    if(sessionUser.value){
        try{
            decode.value = jwtDecode(sessionUser.value)
        }catch(e){
             console.error('JWT decode error:', e)  
        }
    }

    return {
        provide:{
            auth_user  : decode
        }
    }
})