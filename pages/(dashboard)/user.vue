<script setup lang="ts"> 
import  * as tb from '~/components/Table'
definePageMeta({
     layout: 'dashboard',
     middleware: ['admin']
});
 
 
const {showToast} = useGlobal();
const route = useRoute()
const router = useRouter()

let row = ref<any[]>([])
let limit = ref<Number>(  route.query.limit ? Number(route.query.limit) : 10)
let page = ref<Number>(  route.query.page ? Number(route.query.page) : 1) 
let total = ref<Number>(1)  
let search = ref<String>('')
const getValue = debounceValue( async (val: string, callback: (result: any) => void) => { 
    return callback(val);
}, 300);

watch(search,async (val) => { 
    const callbackBounce = (v:any)=>{
    router.replace({
            query: {
                ...route.query, 
                search: v,
                page:1
            }
        })
    }
    getValue(val,callbackBounce) 
   
});

 
let loading = ref<Boolean>(true);

const getData = async ()=>{
    loading.value = true; 
    let data = reactive({
        table : 'user',
        type_table : 'main',
        page : page.value,
        limit : limit.value,
        name : '', 
    })

    if(search !==''){
        data.name = search.value
    }else{
        data.name = ''
    }
 

    Object.entries(route.query).forEach(([i,v])=>{  
        if(data[i]  == undefined){ 
            data[i]=v;
        } 
    })
    
    try{
   
        let d = await useServerApi({action:"GET",url:'/api/dd/get/data', payload:data})
        if(d.status !== 200){
            return showToast("Terjadi kesalahan", "error")
        } 
        let r = d.data.data; 
        total.value = r.total;
        row.value = r.rows !== undefined ? r.rows : [];
     }catch(e){
        console.log(e)
        return showToast("Terjadi kesalahan", "error") 
    }
}
watch(
  () => route.query, // pakai getter function
 async (newQuery) => { 
    if(newQuery.page !== undefined){
        page.value =parseInt(newQuery.page);
    }else{
         page.value = 1;
    }
    // console.log(newQuery);
    if(newQuery.limit !== undefined){
        limit.value = parseInt(newQuery.limit); 
    }else{
         limit.value =10;
    }
  
    await getData().finally(()=>{loading.value = false}); 
  },
  { deep: true }
)
 

onMounted(async()=>{
    await getData().finally(()=>{loading.value = false});
 
});


 
</script>

<template>

    <div class="p-4 bg-white rounded-2xl">
        <tb.Table :loading="loading" :total="total" :limit="limit"  :page="page">
            <template #filter>
                <div class="w-full flex  space-x-2.5">
                    <div>
                        <partials-input-floating name="search" id="search" v-model:value="search" :stat-float="false" placeholder="cari..." label="cari..."></partials-input-floating>
                    </div> 
                </div>
            </template>
            <template #head>
                <tb.TR :isHead="true"> 
                    <tb.TD class="px-1" :isHead="true">No.</tb.TD>
                    <tb.TD  :isHead="true" :isSort="true"  sort_by="sort_name">Nama </tb.TD>  
                    <tb.TD  :isHead="true" :isSort="true"  sort_by="sort_email">Email</tb.TD>  
                    <tb.TD  :isHead="true">Phone</tb.TD>  
                    <tb.TD  :isHead="true">Username</tb.TD>  
                    <tb.TD  :isHead="true">Roles</tb.TD>  
                    <tb.TD  :isHead="true">Created At</tb.TD>  
                </tb.TR>
            </template>
            <template #body>
                <tb.TR :isHead="false"  v-for="(value, index) in row" :key="index"> 
                    <tb.TD class="px-1  w-12"> {{ (page - 1) * limit + (index + 1) }}</tb.TD>
                    <tb.TD > {{ value.name }}</tb.TD>
                    <tb.TD > {{ value.email ?? '-' }}</tb.TD>
                    <tb.TD > {{ value.phone ?? '-' }}</tb.TD>
                    <tb.TD > {{ value.username }}</tb.TD>
                    <tb.TD > {{ value.user_roles.deskripsi }}</tb.TD>
                    <tb.TD > {{ value.created_at }}</tb.TD>
                </tb.TR>
            </template>
        </tb.Table>
        
    </div>
   
</template>