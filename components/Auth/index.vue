<template>
<div class="w-full h-screen grid grid-cols-2 bg-amber-100 relative max-lg:grid-cols-1">
  
    <div class="absolute inset-0 bg-cover bg-center min-w-8/12"   style="background-image: url('/images/steel.jpg');"></div>
 
    <div class="absolute inset-0 bg-black/60"></div>
 
  <div class="relative  flex items-center justify-center">
    <div class="relative z-10 text-white text-center">
        <h3 class="text-white text-4xl font-semibold text-center max-lg:text-2xl">
            Cart System
        </h3>
        <h3 class="text-white text-3xl font-semibold text-center max-lg:text-2xl">
           PT The Master Steel  
        </h3>

        <h4 class="text-white text-xl max-lg:text-base ">
            Login sekarang untuk Mulai transaksi
        </h4>
    </div>
  </div>
 
  <div class="bg-white rounded-l-4xl relative z-20 flex items-center justify-center max-lg:rounded-t-4xl max-lg:rounded-b-none">
    <div class="space-y-3 w-2/3">
         <slot name="body"></slot>
    </div>
  </div>
</div>

</template>
