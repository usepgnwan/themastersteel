<template>
    <MainLayoutPartialsSkeletonCardproduct/>
     <NuxtLink href="/detail/tes-1234" class="border border-gray-200 min-h-72 space-y-3  p-4 hover:border-black cursor-pointer" v-for="value in Array(12)">
        <div class="h-48 border border-gray-100">
            <NuxtImg format="webp" src="/images/steel2.jpg" class="w-full h-full object-cover aspect-square" />
        </div>
        <p class="font-semibold">Rp.1000000</p>
        <p class="text-sm line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        
        <el-button type="primary"  class="w-full !bg-blue-950 !ring-none"> <UIcon name="i-tdesign-cart-add"></UIcon> &nbsp; Keranjang</el-button>

    </NuxtLink>
</template>