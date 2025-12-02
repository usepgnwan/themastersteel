import { useApi } from "~/composables/useAPI.server";
import { usePayloadData } from "~/composables/usePayloadData";

export default defineEventHandler(async event => {
    const query = getQuery(event) 
    let uri = new URLSearchParams()
    let type = '';
    let id = '';
    let table = ''; 
    // let decrypt = usePayloadData(query.payload, false); 
    const config = useRuntimeConfig();
    let decrypt = Object.fromEntries(new URLSearchParams(query.payload as any))
    if(config.public.APP_ENV == 'production'){
        decrypt = usePayloadData(query.payload, false).payload; 
    }
    Object.entries(decrypt).forEach(([key, value]) => {
        if (value !== undefined && key !== 'table' && key !=="type_table") {
            uri.set(key, String(value)) // pastikan String biar aman
        }

        if(key  == 'id') {
            id = String(value) ??'';
        }
        if(key  == 'table') {
            table = String(value) ??'';
        }
        if(key  == 'type_table') {
            type = String(value) ??'';
        }
    })

  
    const api = useApi(); 
    let {data, error , status} = await api.del(table +"/"+id, { 
            type: type ?? 'role'  
        })
    
    setResponseStatus(event, status);
  
    return {
        data, error , status
    }

  
});