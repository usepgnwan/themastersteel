<script setup lang="ts">
const route = useRoute()
const { toRupiah } = useGlobal();
const slug = route.params.slug
const img = ref([]);

const imgFirst = ref(0);

const slide = (idx:number) =>{
     imgFirst.value = idx
}

const total = ref<number>(1);

const adjustTotal = (type:string) =>{
    if(type == "+"){
        total.value +=1;
    }else{
        if(total.value >1){
            total.value -=1;     
        }
    }
}

    const { $auth_user, $auth_buyer } = useNuxtApp() // user dashboard
    const {showToast} = useGlobal(); 
    let row = ref<any>({})
    let loading = ref<Boolean>(true)
    const getData = async ()=>{
        loading.value = true; 
        let data = {
            table : 'product/'+slug,
            type_table : 'main', 
        }
 
    
        try{ 
            let d = await useServerApi({action:"GET",url:'/api/dd/get/data', payload:data})
    
            if(d.status !== 200){
                return showToast("Terjadi kesalahan", "error")
            } 
            let r = d.data.data; 

            img.value = r.product_image
            row.value = r
        }catch(e){ 
            return showToast("Terjadi kesalahan", "error") 
        }
    }
    onMounted(async()=>{ 
        await getData().finally(()=>{loading.value = false}); 
    });

    interface cart<T> {
        category: string,
        deskripsi: string,
        harga: string,
        product_id: string,
        product_image: string,
        qty: string,
        slug: string,
        title: string,
        total_harga: string,
        user_id: string
    }

    let rowCart = ref<cart<{}>>({
        category : row.value.category,
        deskripsi : row.value.deskripsi,
        harga :  row.value.harga,
        product_id : row.value.id,
        product_image : "",
        qty : "0",
        slug : row.value.slug,
        title : row.value.title,
        total_harga : "0",
        user_id : ""
    })
    
    const { total_cart } =useCartdata() 
    const addtocart = async () =>{ 
        if($auth_buyer.value === null){
            showToast("Login terlebih dahulu!","warning")
            return navigateTo('/login');
        }
        rowCart.value.qty = total.value.toString()
        rowCart.value.total_harga = (total.value *  row.value.harga).toString()
        rowCart.value.category = row.value.category;
        rowCart.value.deskripsi = row.value.deskripsi;
        rowCart.value.harga =  row.value.harga;
        rowCart.value.product_id = row.value.id;
        rowCart.value.slug = row.value.slug;
        rowCart.value.title = row.value.title;
        rowCart.value.product_image = row.value.product_image[0] !== undefined ? row.value.product_image[0].src : "";
        rowCart.value.user_id = $auth_buyer.value  !== null ? $auth_buyer.value.id : "";
   

        try { 

            let d = await useServerApi({action:"POST",url:"/api/dd/post/data",dataform:rowCart, payload: {
                table : 'cart',
                type_table : 'main', 
            }});

            if(d.status === 200 || d.status === 201){ 
                showToast('Cart Berhasil disimpan' , 'success')
                navigateTo('/cart');
            } else{
                
                if(d.status === 400){
                    return showToast(d.error, "error")
                }
                return showToast("Terjadi kesalahan", "error")
            } 

            await getCart($auth_buyer.value.id).then((v)=>{ 
                let data = [];
                if(v.value.code == 200){
                    data = v.value.data
                } 
                total_cart.value = data.reduce((carry, v)=> carry + Number(v.qty),0)
            
            }) 
        }catch(e){   
            if (e?.response?.status === 400 || e?.status === 400) {
                return showToast(e?.response?._data?.error || "error", "warning")
            }
            showToast("terjadi kesalahan", "error")
        }
    }
</script>
<template>
    <section class="min-h-screen max-w-screen-xl mx-auto max-md:w-11/12 mt-32 max-lg:mt-32 space-y-10 md:px-12 xl:px-0">
        <MainLayoutPartialsSkeletonDetailproduct v-if="loading"/>
        <div class="flex space-x-3" v-if="!loading">
            <div class="w-2/5 p-4 h-72">
                <div class="relative">
                    <button v-if="imgFirst !== 0"   @click="slide(imgFirst - 1)" class="hover:cursor-pointer absolute -left-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-blue-950/75 text-white shadow   flex items-center justify-center">
                        <UIcon name="i-mingcute-left-line" class="w-5 h-5"></UIcon>
                    </button>  
                  
                    <button v-if="imgFirst  < (img.length-1)"   @click="slide(imgFirst + 1)" class="hover:cursor-pointer absolute -right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-blue-950/75 text-white shadow   flex items-center justify-center">
                        <UIcon name="i-mingcute-right-line" class="w-5 h-5"></UIcon> 
                    </button> 
                    
                    <NuxtImg format="webp" v-if="img[imgFirst] !== undefined" :src="img[imgFirst].src" class="w-full h-full object-cover aspect-square" />
                    <div v-if="img[imgFirst] === undefined"  class="flex items-center justify-center w-full h-96  bg-gray-300  dark:bg-gray-700"  >
                        <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                        </svg>
                    </div>
                </div>
               <div class="grid grid-cols-5 gap-3 mt-3"> 
                    <NuxtImg   @click="slide(k)" format="webp" :src="v.src" class="w-full h-full object-cover aspect-square cursor-pointer" v-for="(v,k) in img" :key="k" /> 
               </div>
            </div>
            <div class="p-4  w-3/5 ">
                <div class="space-y-4">
                    <h4 class="text-2xl font-semibold">{{ row.title }} </h4>
                    <h3 class="text-3xl font-semibold">Rp. {{ toRupiah(row.harga) }} </h3>
                    <p class="line-clamp-6 ">{{ row.deskripsi }}</p>
                </div>
                <div class="grid grid-cols-3 mt-10 gap-3" v-if="$auth_user?.name === undefined">
                    <div class="inline-flex items-center space-x-2 ">
                        <button
                        type="button" 
                        @click="adjustTotal('-')"
                        class="w-8 h-8 flex items-center justify-center border-gray-200 border hover:bg-gray-100 disabled:opacity-40"
                        aria-label="Kurangi jumlah"
                        >-</button> 
                        <input
                        type="number" 
                        min="1"
                        v-model="total"
                        class="w-[60%] text-center border-gray-200 border px-2 py-1 focus:outline-none"
                        aria-label="Jumlah item"
                        />  
                        <button
                        type="button" 
                        @click="adjustTotal('+')"
                        class="w-8 h-8 flex items-center justify-center border-gray-200 border hover:bg-gray-100 disabled:opacity-40"
                        aria-label="Tambah jumlah"
                        >+</button> 
                    </div>
                    <div >
                        <el-button type="primary" class="w-full !bg-blue-950 !ring-none" @click="addtocart()">
                            <UIcon name="i-tdesign-cart-add"></UIcon> &nbsp;
                            Keranjang</el-button>
                    </div>
                    <div >
                        <el-button type="warning" class="w-full ">
                            <UIcon name="i-lucide-heart"></UIcon> &nbsp;
                           
                            Whislist</el-button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>