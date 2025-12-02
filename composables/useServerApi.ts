interface formAction {url:string, action: 'POST' | 'GET' | 'PUT' | 'PATCH' ; payload?: any | null, dataform?:any | null }
export const useServerApi =async ({url , action, payload, dataform} : formAction) => {
    let URL = url;
    const config = useRuntimeConfig(); 
    const query = new URLSearchParams(payload as any).toString()
    if(payload !== null){
        let encrypt = usePayloadData(payload);
  
        let p = config.public.APP_ENV == 'local' ? query : encrypt.payload;
        let uri = new URLSearchParams(); 
        uri.set('payload', p.toString())
        URL = URL +"?" + uri;
    }
 
    let dataForm = reactive({payload:dataform});
    
    if(config.public.APP_ENV == 'production'){
        let encrypt = usePayloadData(dataform);
        dataForm.payload = encrypt.payload;
    }
    let data = reactive({
        method : action,
    });

    if(action !== 'GET'){
        data.body = dataForm;
    }

    let d = await $fetch(URL, data); 
    return d;
}