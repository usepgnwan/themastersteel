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
    let type = 'role';
    let table = '';

 
    let decrypt = Object.fromEntries(new URLSearchParams(query.payload as any))
    if(config.public.APP_ENV == 'production'){
        decrypt = usePayloadData(query.payload, false).payload; 
    }
    Object.entries(decrypt).forEach(([key, value]) => {
        if (value !== undefined && key !== 'table' && key !=="type_table") {
            uri.set(key, String(value)) // pastikan String biar aman
        }
        if(key  == 'table') {
            table = String(value) ??'';
        }
        if(key  == 'type_table') {
            type = String(value) ??'';
        }
    })

    const id = getRouterParam(event, 'id')

    const api = useApi(); 

    const {data, error , status} = await api.get(table+'/'+id, { 
        type: type 
    });

    setResponseStatus(event, status);

    return {
        data, error , status
    }
});