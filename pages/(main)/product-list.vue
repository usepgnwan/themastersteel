<script setup lang="ts">
import CardProduct from '~/components/MainLayout/card-product.vue';
const checkList = ref([]);
const listCategory = [
    "Bar",
    "Wire",
    "Ibeam",
    "Upn Channel",
    "Equal Angle",
]
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
                <CardProduct />
            </div>
        </div>
                  
    </section>
</template>