<script setup lang="ts">
    const { toRupiah } = useGlobal();
    const props = defineProps({
        loading:{type:Boolean, default:true},  
        data: { type: Object as PropType<any>, default: () => ([]) }, 
            
    });
</script>

<template> 
        <NuxtLink :href="`/detail/${v.slug}`" class="border border-gray-200 min-h-72 space-y-3  p-4 hover:border-black cursor-pointer" v-if="!loading && data.length > 0" :key="k"  v-for="(v,k) in data" > 
            <div class="h-48 border border-gray-100">
                <NuxtImg format="webp" :src="v.product_image[0].src" class="w-full h-full object-cover aspect-square" v-if="v.product_image[0] !== undefined" />

                <div class="flex items-center justify-center w-full h-48 bg-gray-300  dark:bg-gray-700" v-if="v.product_image[0] === undefined">
                    <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                    </svg>
                </div>
            </div>
           
            <p class="font-semibold">Rp. {{toRupiah(v.harga) }}</p>
            <p class="text-sm line-clamp-2"> {{ v.title }} </p>
            
            <el-button type="primary"  class="w-full !bg-blue-950 !ring-none"> <UIcon name="i-tdesign-cart-add"></UIcon> &nbsp; Keranjang</el-button>

        </NuxtLink>

</template>