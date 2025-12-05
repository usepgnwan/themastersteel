<script lang="ts" setup>
    import { ref } from 'vue'
    import SkeletonCart from '~/components/MainLayout/partials/skeleton-cart.vue';
    const {toRupiah, showToast} = useGlobal()

   
    definePageMeta({
        layout: 'default',
        middleware: ['buyer']
    });
    const { $auth_buyer  } = useNuxtApp()    
    const checkList = ref<any[]>([]);
 
    const checkAll = ref(false);
    const handleCheckAllChange = (value:any[]) => { 
        if (checkAll.value) {
            checkList.value = [];
            checkAll.value = false;
        } else {
            checkList.value = value.map((v)=>v.id);
            checkAll.value = true;
        }
        console.log(checkList);
    };

    let row = ref<any[]>([])
    let loading = ref<Boolean>(true)
   
  
    onMounted(async()=>{  
        await getCart($auth_buyer.value.id).then((v)=>{ 
            if(v.value.code == 200){
                row.value = v.value.data
            }
        }).finally(() => {
            loading.value = false;
        })
    });

    const total = ref<Number>(0);
    const qty = ref<Number>(0);
    watch(()=>checkList,(v)=>{
        const filtered = row.value.filter(item => v.value.includes(item.id)); 
          total.value = filtered.reduce((sum, item) => sum + Number(item.total_harga), 0);
          qty.value = filtered.reduce((sum, item) => sum + Number(item.qty), 0);
    },{deep:true})

    const checkout = () =>{
        showToast("dalam proses pengmbangan", "warning") 
    }
</script>

<template>
    <section class="max-w-screen-xl mx-auto max-md:w-11/12 mt-32 max-lg:mt-32 space-y-10 md:px-12 xl:px-0 min-h-screen flex space-x-4"> 
        <div class="w-3/4">
            <div class=" grid grid-cols-1 gap-2" >
                <div class="border border-gray-200 p-2 flex space-x-3 rounded-t-2xl  px-4">
                    <el-checkbox
                        :value="checkAll" 
                        @change="handleCheckAllChange(row)"
                    >
                     <span>Pilih Semua</span>
                     </el-checkbox>
                </div>
                <SkeletonCart v-if="loading" v-for="value in Array(7)" :key="value"/>
                <div class="border border-gray-200 p-4  space-y-4"  v-for="(v,k) in row" :key="k">
                    <div class="flex space-x-2"> 
                        <el-checkbox-group v-model="checkList" class="flex flex-col">
                            <el-checkbox  :value="v.id"  />  
                        </el-checkbox-group> 
                        <div class="h-16 w-16 border border-gray-100 ">
                            <div  v-if="v.product_image === ''"  class="flex items-center justify-center h-16 w-16   bg-gray-300  dark:bg-gray-700"  >
                                <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            </div>
                            <NuxtImg format="webp" :src="v.product_image" class="w-full h-full object-cover aspect-square" v-if="v.product_image !== ''"/> 
                        </div> 
                        <div class="flex flex-col w-full">
                            <p class="font-semibold">{{ v.title }} </p>
                            <div class="flex justify-between w-full">
                                <p>Total : {{ v.qty }}</p>
                                <div class="inline-flex   space-x-2 ">
                                    <button
                                    @click="checkout" 
                                    type="button"  
                                    class="w-8 h-8 flex items-center justify-center border-gray-200 border hover:bg-gray-100 disabled:opacity-40"
                                    aria-label="Kurangi jumlah"
                                    >-</button> 
                                    <input
                                    type="number" 
                                    min="1" 
                                    value="1"
                                    class="w-28 text-center border-gray-200 border px-2 py-1 focus:outline-none"
                                    aria-label="Jumlah item"
                                    />  
                                    <button
                                    @click="checkout" 
                                    type="button"  
                                    class="w-8 h-8 flex items-center justify-center border-gray-200 border hover:bg-gray-100 disabled:opacity-40"
                                    aria-label="Tambah jumlah"
                                    >+</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        <div class="w-1/4">
            <div class="border border-gray-200  p-4 sticky top-24 rounded-2xl space-y-4">
                 <div>
                    <p >Total</p>
                    <h5 class="font-semibold text-2xl">Rp. {{ toRupiah(total) }}</h5> 
                    <p >Qty : {{ qty }}</p>
                 </div>
                <el-button @click="checkout" type="primary"  class="w-full !bg-blue-950 !ring-none"> <UIcon name="i-tdesign-cart-add"></UIcon> &nbsp; Checkout</el-button>

            </div>
        </div>
    </section>
</template>