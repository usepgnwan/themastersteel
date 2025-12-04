 

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import cloneDeep from 'lodash.clonedeep';
import { debounceValue } from '~/utils/custom';
import { menu } from '~/utils/menu';
 
let {hbar, wbar} = useSideBarData()
 
const { width } = useWindowSize()

 
const isBelowLg = computed(() => width.value < 1024)

watch(isBelowLg, (newVal, oldVal) => {
  if (!newVal && hbar.value) { 
    hbar.value = !newVal
  }
}) 
const rawData = toRaw(menu); // Removes Proxy wrapper
const cloned = cloneDeep(rawData); // Now it works! 
let menus = reactive<any[]>([])
onMounted(()=>{
  menus.splice(0, menus.length, ...cloned) 
});

const getValue = debounceValue((val: string, newdata: any, callback: (result: any) => void) => {
  let data = cloneDeep(rawData);
 
  if (val !== '' && val !== null) {
    data = newdata.map((v: any) => {  
        let filteredChildren =  v.data?.filter((child: any) => {
                // Pastikan child bukan null/undefined dan punya label
                if (!child || typeof child.label !== 'string') return false;
              
                const isLabelMatch = child.label.toLowerCase().includes(val.toLowerCase());
                if(isLabelMatch){ 
                  return isLabelMatch;
                }


                // Jika ada children, filter juga children-nya
                if (!isLabelMatch && Array.isArray(child.children)) {
                    child.children = child.children.filter((sub: any) =>
                      sub?.label &&
                      typeof sub.label === 'string' &&
                      sub.label.toLowerCase().includes(val.toLowerCase())
                    ); 
                    child.defaultOpen = true;
                }

              return  child.children && child.children.length > 0;
        }) || [] ;

        const isParentMatch = v.label.toLowerCase().includes(val.toLowerCase());

        if (isParentMatch || filteredChildren.length > 0) {
          return {
            ...v,
            data: filteredChildren,
          };
        }

        return null;
      }).filter(Boolean); // buang null
  } 

  callback(data); // kirim hasil ke luar
}, 300);

let search = ref<string>('')
watch(search, (val)=>{
  const getNewval = (filteredData : any)=>{ 
      menus.splice(0, menus.length, ...filteredData)
  }

  getValue(val, cloneDeep(rawData), getNewval);

})

let {loading } = useDataPartial(); 
</script>
<template>
    <div id="sidebard-dahsboard" class="transition-all duration-300 transform relative hidden lg:flex flex-col min-h-svh min-w-16  *: shrink-0 border-r border-default bg-elevated/25 w-(--width) bg-gradient-to-r from-black to-black/75  " :style="{ '--width': wbar }">
      <div class=" shrink-0 flex items-center gap-1.5 px-4  h-(--ui-header-height) text-white justify-center space-x-2">
      
        <NuxtImg format="webp" src="/images/logo-steelms.png" width="150" placeholder />
      </div>
      <div class="mb-2 relative mx-4 mt-2" v-if="!hbar" >
              <UIcon name="i-ion-search" class="absolute left-4 top-1/2 -translate-1/2 z-10" ></UIcon>
              <UIcon name="i-material-symbols-close-rounded" class="absolute right-1 top-1/2 -translate-1/2 z-10" v-if="search !== ''" @click="search = ''"></UIcon>
              <PartialsInputFloating :statFloat="false" addClass="bg-white !pl-8 !rounded-3xl" placeholder="cari menu..." v-model:value="search"></PartialsInputFloating>
        </div>
      <!-- INI UNTUK VERSI MOBILE --> 
      <UDrawer v-if="isBelowLg" v-model:open="hbar" direction="left" class="!rounded-r-none !bg-gradient-to-r !from-black !to-black/75 !overflow-hidden" 
          :handle="false" 
          :ui="{  
          container: '!pl-4  !pr-0 !pt-4 !pb-0 !overflow-hidden ', 
          header: '', body:'w-96 overflow-y-auto' }"
      >  
          <template #header>
              <div class="flex items-center justify-between !px-4">
                  <div class="flex items-center space-x-2 justify-center "> 
                    
        <NuxtImg format="webp" src="/images/logo-steelms.png" width="150" placeholder  />
                </div>
                <UButton color="neutral" variant="ghost" icon="i-lucide-x" @click="hideSidebar" class="cursor-pointer"/>
              </div>
              <div class=" relative pr-4 mt-8" >
                    <UIcon name="i-ion-search" class="absolute left-4 top-1/2 -translate-1/2 z-10" ></UIcon>
                    <PartialsInputFloating :statFloat="false" addClass="bg-white !pl-8 !rounded-3xl" placeholder="cari menu..." v-model:value="search"></PartialsInputFloating>
              </div>
          </template>
          <template #body> 
            <div class="pr-4"> 
                  <div class="flex flex-col space-y-2" v-if="loading">
                      <div  class="w-full h-8 inset-0 bg-gray-200 animate-pulse rounded-lg" v-for="value in Array(13)" :key="value"></div>
                  </div>
                  <ClientOnly>
                    <div v-for="(item, index) in menus":key="index"  v-if="!loading">
                      <h4 class="font-semibold text-white mb-3 text-xl"  >{{ item.label }}</h4>  
                        <LayoutPartialsMenuLink
                            v-for="(data, i) in item.data"
                            :key="i"
                            :item="data" 
                            :ismobile="false"
                          />
                    </div>
                  </ClientOnly>
         
            </div>
          </template>
      </UDrawer>

      

      <!-- INI UNTUK VERSI WEB -->
      <div class="flex flex-col gap-1 flex-1 overflow-y-auto px-4 overflow-x-hidden scrollbar-none    scrollbar-thumb-gray-400 scrollbar-track-gray-100   py-2" :class="!hbar ? 'hover:scrollbar-thin':''"> 
 
        <div class="flex flex-col space-y-2" v-if="loading">
            <div  class="w-full h-8 inset-0 bg-gray-200 animate-pulse rounded-lg" v-for="value in Array(13)" :key="value"></div>
        </div>
        <ClientOnly> 
          <div v-for="(item, index) in menus":key="index" v-if="!loading">
            <h4 class="font-semibold text-white mb-3" :class="hbar ? 'text-xs text-wrap text-center':'text-lg '" >{{ item.label }}</h4> 
           
                    <LayoutPartialsMenuLink
                                        v-for="(data, i) in item.data"
                                        :key="i"
                                        :item="data" 
                                        :ismobile="hbar"
                                      />
                                      
          </div>
        </ClientOnly>
      </div> 
    </div>
</template>