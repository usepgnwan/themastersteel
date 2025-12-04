<script setup lang="ts">
    import CardProduct from '~/components/MainLayout/card-product.vue'; 
import Emptyproduct from '~/components/MainLayout/emptyproduct.vue';

    let row = ref<any[]>([])
    let limit = ref<Number>(10)
    let page = ref<Number>(1)   
    let total = ref<Number>(1)  
    let loading = ref<Boolean>(true)
    
    const {showToast} = useGlobal();
    const getData = async ()=>{
        loading.value = true; 
        let data = {
            table : 'product',
            type_table : 'main',
            page : page.value,
            limit : limit.value,
            title : '',
        }
 
    
        try{ 
            let d = await useServerApi({action:"GET",url:'/api/dd/get/data', payload:data})
    
            if(d.status !== 200){
                return showToast("Terjadi kesalahan", "error")
            } 
            let r = d.data.data;
            total.value = r.total;
            row.value = r.rows !== undefined ? r.rows : [];
            // console.log(row);
        }catch(e){
            // console.log(e)
            return showToast("Terjadi kesalahan", "error") 
        }
    }
    onMounted(async()=>{
        await getData().finally(()=>{loading.value = false}); 
    });
</script>

<template> 
    <section class="max-w-screen-xl mx-auto max-md:w-11/12 mt-32 max-lg:mt-32 space-y-10 md:px-12 xl:px-0">
        <div class="h-80 w-full relative rounded-2xl overflow-hidden">
            <div class="absolute inset-0 bg-fixed bg-center min-w-8/12 rounded-2xl"   style="background-image: url('/images/steel2.jpg');"></div> 
            <div class="absolute inset-0 bg-black/60"></div>
            <div class="absolute inset-0 flex items-center justify-center text-white text-center px-4 flex-col w-3/4 space-y-3 mx-auto">
                <h4 class="text-3xl font-semibold">
                    PT The Master Steel Mfg
                </h4>
                <p class="text-xs">
                   The Master Steel Company advocates energy efficiency. Campaigns directed in all our plants highlight the importance of utilizing fossil fuel as eficient as possible, from the natural gas used in our burners to the diesel we used in our motorized heavy equipments. Even electricity that we use to melt steel and to power up our plants comes mostly from coal and natural gas fed power plant. Better fuel eficiency can be achieved by investing in better equipment, control, and awareness of the whole team.
                </p>
            </div>      
        </div>
        <div class="min-h-screen ">
            <div class="w-full p-4 rounded-2xl bg-black text-white">
                <h5 class="text-xl">Rekomendasi</h5>
            </div>
            <div class="grid grid-cols-5 mt-14 max-lg:grid-cols-3 max-md:grid-cols-2 gap-2" >
                <CardProduct :loading="loading"  :data="row"  v-if="row.length > 0" />
               
                <MainLayoutPartialsSkeletonCardproduct v-for="value in Array(10)" v-if="loading"   :key="value"/>
            </div>
            <Emptyproduct :loading="loading" :data="row" />
            <div class="flex justify-end mt-5">
                <NuxtLink href="product-list" class="text-blue-800 hover:text-blue-900">Lihat selengkapnya</NuxtLink>
            </div>
        </div>
    </section>   
</template>