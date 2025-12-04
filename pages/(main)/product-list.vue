<script setup lang="ts">
import CardProduct from '~/components/MainLayout/card-product.vue';
import Emptyproduct from '~/components/MainLayout/emptyproduct.vue';
const checkList = ref([]);
const listCategory = [
    "Bar",
    "Wire",
    "Ibeam",
    "Upn Channel",
    "Equal Angle",
]

const {showToast} = useGlobal();
const route = useRoute()
const router = useRouter()

let row = ref<any[]>([])
let limit = ref<Number>(10)
let page = ref<Number>(1)   
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
    let data = {
        table : 'product',
        type_table : 'main',
        page : page.value,
        limit : limit.value, 
        
    }

    if(search !==''){
        data.title = search.value
    }else{
        data.title = ''
    }
 
    if(checkList.value.length > 0){
       data.category = checkList.value.join(',')
    }

    try{ 
        let d = await useServerApi({action:"GET",url:'/api/dd/get/data', payload:data})
 
        if(d.status !== 200){
            return showToast("Terjadi kesalahan", "error")
        } 
        let r = d.data.data;
        total.value = r.total;
        row.value = r.rows !== undefined ? r.rows : [];
        console.log(row)
     }catch(e){
         console.log(e)
         return showToast("Terjadi kesalahan", "error") 
    }
}
watch(
  () => route.query, // pakai getter function
 async (newQuery) => { 
    if(newQuery.search !== undefined){
        search.value = newQuery.search
    }
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

watch(()=>checkList,
(v)=>{
    (async()=>{
        await getData().finally(()=>{loading.value = false}); 
    })()
},
  { deep: true })
</script>

<template>
    
    <section class="max-w-screen-xl mx-auto max-md:w-11/12 mt-32 max-lg:mt-32 space-y-10 md:px-12 xl:px-0 flex space-x-2">
        <div class="w-1/6">
            <div class="border border-gray-200  p-4 sticky top-24">
                <h5 class="font-semibold">Produk Kami</h5>
                <el-checkbox-group v-model="checkList" class="flex flex-col">
                    <el-checkbox :label="v" :value="v" v-for="(v,k) in listCategory" :key="k" />  
                </el-checkbox-group> 
            </div>
        </div>
        <div class="w-10/12">
            <div class=" grid grid-cols-4  max-lg:grid-cols-3 max-md:grid-cols-2 gap-2" >
                <CardProduct :loading="loading"  :data="row"  v-if="row.length > 0" />
                <MainLayoutPartialsSkeletonCardproduct v-for="value in Array(10)" v-if="loading"   :key="value"/>
            </div>
            <Emptyproduct :loading="loading" :data="row" />
        </div>
                  
    </section>
</template>