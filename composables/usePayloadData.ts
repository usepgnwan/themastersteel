import CryptoJS from 'crypto-js'
export const usePayloadData = (data : any, encrypt: boolean = true) => {
    const config = useRuntimeConfig();
    
    let  payload  = encrypt ? encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(data), config.public.secretForm).toString()) : {}; 

    if(!encrypt){ 
        const decoded = decodeURIComponent(data);
        const decrypted = CryptoJS.AES.decrypt(decoded, config.public.secretForm).toString(CryptoJS.enc.Utf8);
        payload = JSON.parse(decrypted);
    }

    return {
       payload
    };
}