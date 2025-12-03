<script lang="ts" setup>
    import { ref } from 'vue'
 

    const checkList = ref<any[]>([]);
    const listCategory = [
        "Bar",
        "Wire",
        "Ibeam",
        "Upn Channel",
        "Equal Angle",
    ]
    const checkAll = ref(false);
    const handleCheckAllChange = (value:any[]) => { 
        if (checkAll.value) {
            checkList.value = [];
            checkAll.value = false;
        } else {
            checkList.value = value;
            checkAll.value = true;
        }
    };
</script>

<template>
    <section class="max-w-screen-xl mx-auto max-md:w-11/12 mt-32 max-lg:mt-32 space-y-10 md:px-12 xl:px-0 min-h-screen flex space-x-4">
        <div class="w-3/4">
            <div class=" grid grid-cols-1 gap-2" >
                <div class="border border-gray-200 p-2 flex space-x-3 rounded-t-2xl  px-4">
                    <el-checkbox
                        :value="checkAll" 
                        @change="handleCheckAllChange(listCategory)"
                    >
                     <span>Pilih Semua</span>
                     </el-checkbox>
                </div>
                <div class="border border-gray-200 p-4  space-y-4"  v-for="(v,k) in listCategory" :key="k">
                    <div class="flex space-x-2"> 
                        <el-checkbox-group v-model="checkList" class="flex flex-col">
                            <el-checkbox  :value="v"  />  
                        </el-checkbox-group> 
                        <div class="h-16 w-16 border border-gray-100 ">
                            <NuxtImg format="webp" src="/images/steel2.jpg" class="w-full h-full object-cover aspect-square" /> 
                        </div> 
                        <div class="flex flex-col w-full">
                            <p class="font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit.  </p>
                            <div class="flex justify-between w-full">
                                <p>Total : 100</p>
                                <div class="inline-flex   space-x-2 ">
                                    <button
                                    type="button"  
                                    class="w-8 h-8 flex items-center justify-center border-gray-200 border hover:bg-gray-100 disabled:opacity-40"
                                    aria-label="Kurangi jumlah"
                                    >-</button> 
                                    <input
                                    type="number" 
                                    min="1" 
                                    class="w-28 text-center border-gray-200 border px-2 py-1 focus:outline-none"
                                    aria-label="Jumlah item"
                                    />  
                                    <button
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
                    <h5 class="font-semibold text-2xl">Rp. 5000</h5> 
                    <p >Qty : 100</p>
                 </div>
                <el-button type="primary"  class="w-full !bg-blue-950 !ring-none"> <UIcon name="i-tdesign-cart-add"></UIcon> &nbsp; Checkout</el-button>

            </div>
        </div>
    </section>
</template>