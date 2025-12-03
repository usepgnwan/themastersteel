<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug
const img = ref([{
    src:"/images/steel2.jpg"
},
{
    src:"/images/steel.jpg"
}]);

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
</script>
<template>
    <section class="min-h-screen max-w-screen-xl mx-auto max-md:w-11/12 mt-32 max-lg:mt-32 space-y-10 md:px-12 xl:px-0">
        <div class="flex space-x-3">
            <div class="w-2/5 p-4 h-72">
                <div class="relative">
                    <button v-if="imgFirst !== 0"   @click="slide(imgFirst - 1)" class="hover:cursor-pointer absolute -left-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-blue-950/75 text-white shadow   flex items-center justify-center">
                        <UIcon name="i-mingcute-left-line" class="w-5 h-5"></UIcon>
                    </button>  
                  
                    <button v-if="imgFirst  < (img.length-1)"   @click="slide(imgFirst + 1)" class="hover:cursor-pointer absolute -right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-blue-950/75 text-white shadow   flex items-center justify-center">
                        <UIcon name="i-mingcute-right-line" class="w-5 h-5"></UIcon> 
                    </button> 
                    
                    <NuxtImg format="webp" :src="img[imgFirst].src" class="w-full h-full object-cover aspect-square" />
                </div>
               <div class="grid grid-cols-5 gap-3 mt-3"> 
                    <NuxtImg   @click="slide(k)" format="webp" :src="v.src" class="w-full h-full object-cover aspect-square cursor-pointer" v-for="(v,k) in img" :key="k" /> 
               </div>
            </div>
            <div class="p-4  w-3/5 ">
                <div class="space-y-4">
                    <h4 class="text-2xl font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. </h4>
                    <h3 class="text-3xl font-semibold">Rp. 500000 </h3>
                    <p class="line-clamp-6 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium libero tempore ipsam! Aut velit eius nesciunt vero dolores sint quis vitae aspernatur, error reiciendis nisi? Temporibus nihil cupiditate ad doloremque nesciunt recusandae officia! Aliquam labore dicta eum, dignissimos nostrum, vel ratione accusamus animi totam laborum cumque laudantium, sed sapiente. Laudantium, ut et delectus voluptate libero sapiente labore quia placeat quidem. In, nam minima unde quo aliquid dolore doloribus eum quas perferendis a! Facilis velit tempore aspernatur magnam modi id sapiente assumenda beatae aut quibusdam recusandae optio reprehenderit minima voluptatum a, sed, autem culpa quidem! Repellat unde amet nisi beatae, id temporibus rem iusto accusantium asperiores quis adipisci eum optio obcaecati hic, sunt exercitationem aperiam earum. Rerum maiores quibusdam ipsa nisi nobis laborum doloremque sit, nam eligendi nesciunt optio, harum iusto mollitia totam! Rerum autem dolorem inventore est ad! Laboriosam aliquam maiores deleniti exercitationem, cupiditate culpa, libero accusantium dolor quas ex labore, repudiandae tempora debitis distinctio amet? Veritatis cupiditate iure corporis quis iusto minima quo nihil, laborum dolorum voluptates ab aspernatur consectetur unde facere optio, maxime cumque vero, necessitatibus similique fugit deserunt quas ut! Ut, voluptatibus ratione. A ut natus magnam illo illum provident porro! Ab nobis facilis quia hic ut excepturi. Distinctio accusantium odit veniam odio recusandae, reprehenderit harum natus porro magnam adipisci molestias dolor alias modi, explicabo provident sed similique ut ratione labore a exercitationem? Dolor nam magni dolore et error. Officiis quas obcaecati repellendus molestias dignissimos dolore id inventore culpa laudantium consequatur. Adipisci ducimus vero neque, sequi, quibusdam voluptate quae quasi beatae illo architecto quam aliquam itaque obcaecati magni quaerat alias maiores et commodi doloremque! Blanditiis, quaerat voluptas dicta dolorem quos officiis quas eveniet quia aliquid praesentium laborum unde exercitationem quidem minima sunt recusandae? Adipisci in praesentium ex suscipit temporibus rem sapiente consequatur ab non vitae. Blanditiis, placeat!</p>
                </div>
                <div class="grid grid-cols-3 mt-10 gap-3">
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
                        <el-button type="primary" class="w-full !bg-blue-950 !ring-none">
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