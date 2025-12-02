<template>
    <header class="fixed top-0 w-full   bg-gradient-to-r from-black to-gray-800 shadow border-b-2 p-4 z-10">
        <div class="mx-auto w-3/4 flex justify-between">
            <div class="w-2/3 flex space-x-2 items-center px-4">
                <div class="w-1/4">
                    <NuxtImg format="webp" src="/images/logo-steelms.png" width="150"  />
                </div>
                 <div class="relative w-3/4 bg-white rounded-xl px-4 py-3">    
                    <UIcon 
                        name="i-material-symbols-search-rounded" 
                        class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl"
                    />
 
                    <input 
                        type="text"
                        placeholder="Cari sesuatu..."
                        class="w-full bg-transparent focus:outline-none pr-10"
                    />
                </div>

            </div>
            <div class="w-2/6 justify-end flex  space-x-3    items-center text-white px-4">
                <div class="flex items-center space-x-2">
                     <UIcon 
                        name="i-mingcute-notification-line" 
                        class=" text-xl"
                    />
                    <span>3</span>
                </div>
                <div class="flex items-center space-x-2">
                     <UIcon 
                        name="i-lucide-heart" 
                        class=" text-xl"
                    />
                    <span>3</span>
                </div>
                <div class="flex items-center space-x-2">
                     <UIcon 
                        name="i-uil-cart" 
                        class="  text-xl"
                    />
                    <span>3</span>
                </div>
                <div>
                     |
                </div>
                <div class="text-white">
                    <NuxtLink href="login">Login</NuxtLink>
                </div>
            </div>
        </div>
    </header>
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
            <div class="grid grid-cols-6 mt-14  gap-2" >
                <div class="border border-gray-200 min-h-72 space-y-3  p-4 hover:border-black cursor-pointer" v-for="value in Array(12)">
                    <div class="h-48 border border-gray-100">
                         <NuxtImg format="webp" src="/images/steel2.jpg" class="w-full h-full object-cover aspect-square" />
                    </div>
                    <p class="font-semibold">Rp.1000000</p>
                    <p class="text-sm line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                    
                    <el-button type="primary"  class="w-full !bg-blue-950 !ring-none">Keranjang</el-button>

                </div>
            </div>
            <div class="flex justify-end mt-5">
                <NuxtLink href="product-detail" class="text-blue-800 hover:text-blue-900">Lihat selengkapnya</NuxtLink>
            </div>
        </div>
    </section>
    <footer class=" border-t mx-auto max-md:w-11/12  mt-32 pt-8 space-y-10 md:px-12 xl:px-0  bg-gradient-to-r from-black to-gray-800 text-white">
        <div class="max-w-screen-xl mx-auto   space-y-2 md:px-12 xl:px-0">
            <NuxtImg format="webp" src="/images/logo-steelms.png" width="150"  />
            <p class="text-xs" > The Master Steel Company advocates energy efficiency. Campaigns directed in all our plants highlight the importance of utilizing fossil fuel as eficient as possible, from the natural gas used in our burners to the diesel we used in our motorized heavy equipments. Even electricity that we use to melt steel and to power up our plants comes mostly from coal and natural gas fed power plant. Better fuel eficiency can be achieved by investing in better equipment, control, and awareness of the whole team. We invested heavily to minimize dust and noise from our meltshop by putting a doghouse enclosure coupled with automated dust collection system. We have also invested a great deal amount in water treatment plants to conserve and effectively reuse water that we consume in the meltshops and rolling mills.In our continuous campaign of "Going GREEN-er," The Master Steel Company realizes that every person, organization and country leave significant carbon footprint that are detrimental to our fragile environment. CO2 emission has been on the rise with global warming becoming more apparent than ever. We are continuously working to cut down CO2 emission, with the future of the earth and its inhabitants in mind. It takes wholehearted efforts from the whole population, from the smallest to the biggest company, from the bottom level crew to the top level directors, from one individual to a whole nation to cope with this global problem. At The Master Steel Company, our pursuit of perfection encompasses this global crusade for a greener world for the sake of future generations to come. </p>
        </div>
        <div class="border-white border-t text-center p-4 text-base">
            CopyRight @Usepgnwan 2025
        </div>
    </footer>
   
</template>