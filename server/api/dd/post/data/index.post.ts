import { useApi } from "~/composables/useAPI.server";
import { usePayloadData } from "~/composables/usePayloadData";

export default defineEventHandler(async event => {
        
    const headers = event.node.req.headers;

    const origin = headers.origin || headers.referer || "";
    const config = useRuntimeConfig();
    const allowedOrigin = config.public.BASE_URL; 
    if (!origin || !allowedOrigin || !origin.startsWith(allowedOrigin)) {
        return new Response("Unauthorized", { status: 403 });
    }
    
    const query = getQuery(event) 
    let uri = new URLSearchParams()
    let type = '';
    let id = '';
    let table = ''; 
    let method_type = 'patch'; 
    // let decrypt = usePayloadData(query.payload, false);
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
        if(key  == 'method_type') {
            method_type = String(value) ??'patch';
        }
    })

 
    const body = await readBody(event); 
    let decryptBody = body.payload 
    if(config.public.APP_ENV == 'production'){
        decryptBody = usePayloadData(decryptBody, false).payload; 
    }
    console.log(decryptBody);
    const api = useApi(); 
    let  data, error , status;
    if(id !== ''){
        if(method_type == 'put'){
            ({data, error , status} = await api.put(table +"/"+id, { 
                type: type ?? 'role',
                body:decryptBody
            }));
        }else{
            ({data, error , status} = await api.patch(table +"/"+id, { 
                type: type ?? 'role',
                body:decryptBody
            }));
        }
    }else{
        ({data, error , status} = await api.post(table, { 
            type: type ?? 'role',
            body:decryptBody
        }));
    }

   
    setResponseStatus(event, status);
  
    return {
        data, error , status
    }

  
});