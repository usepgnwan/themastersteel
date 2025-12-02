export default defineNuxtPlugin((nuxtApp) => { 
    let {loading } = useDataPartial(); 
    loading.value = false;
    console.log('succcess client side')
});