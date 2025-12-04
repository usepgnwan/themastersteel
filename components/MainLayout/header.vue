<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { $auth_buyer , $auth_user} = useNuxtApp() // user dashboard


let open = ref<Boolean>(false)
const items = computed<DropdownMenuItem[]>(() => {
  console.log($auth_buyer )
  if ( $auth_buyer  == null) {
    return []
  }else{
      return [
        {
          label: $auth_buyer.value?.name ?? '',
          icon: 'i-gg-profile',
          type: 'label'
        },
        {
          type: 'separator'
        },
        {
          label: 'Keluar',
          icon: 'i-material-symbols-logout',
          type: 'checkbox',
        //   checked: showDownloads.value,
          async onSelect() {
            const { showToast } = useGlobal()
            const { BuyerSession } = useCookiedata()

            BuyerSession.value = null
            showToast("Logout berhasil", "success")
            await navigateTo('/')
          }
        }
      ]
  }


})
</script>

<template>
    <header class="fixed top-0 w-full bg-gradient-to-r from-black to-gray-800 shadow border-b-2 p-4 z-10">
        <div class="mx-auto w-3/4 max-lg:w-full max-lg:space-x-2 flex justify-between">
            <div class="w-2/3 flex space-x-2 items-center px-4">
                <NuxtLink href="/" class="w-1/4 max-lg:hidden">
                    <NuxtImg format="webp" src="/images/logo-steelms.png" width="150"  />
                </NuxtLink>
                 <div class="relative w-3/4 max-lg:w-full bg-white rounded-xl px-4 py-3 max-md:py-2">    
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
            
            <div class="w-2/6 justify-end flex  space-x-3 max-md:space-x-1 max-md:text-xs   items-center text-white px-4" v-if="$auth_user !== null">
                <NuxtLink href="/dashboard" class="flex items-center space-x-2 max-md:space-x-0"> 
                    <span>ke > Dashboard</span> 
                </NuxtLink>
            </div>
            <div class="w-2/6 justify-end flex  space-x-3 max-md:space-x-1 max-md:text-xs   items-center text-white px-4" v-if="$auth_user?.name === undefined">
                <div class="flex items-center space-x-2 max-md:space-x-0">
                     <UIcon 
                        name="i-mingcute-notification-line" 
                        class=" text-xl"
                    />
                    <span>3</span>
                </div>
                <div class="flex items-center space-x-2 max-md:space-x-0">
                     <UIcon 
                        name="i-lucide-heart" 
                        class=" text-xl"
                    />
                    <span>3</span>
                </div>
                <NuxtLink href="/cart" class="flex items-center space-x-2 max-md:space-x-0">
                     <UIcon 
                        name="i-uil-cart" 
                        class="  text-xl"
                    />
                    <span>3</span>
                </NuxtLink>
                <div>
                     |
                </div>
                <div class="text-white" v-if="$auth_buyer === null">
                    <NuxtLink href="/login">Login</NuxtLink>
                </div>
                <UDropdownMenu :items="items" :content="{ align: 'start' }" :ui="{ content: 'w-48' }" v-model:open="open" v-if="$auth_buyer !== null && $auth_buyer !== undefined "> 
                      <div class="rounded-3xl px-3 py-1  shadow text-white  bg-gradient-to-r from-black to-black/75 items-center flex space-x-2 cursor-pointer">
                    
                        <div class="flex flex-col px-1">
                          <p class="text-sm flex items-center space-x-4 line-clamp-1">
                             {{$auth_buyer.name ?? ""}}
                          </p>  
                        </div>
                        <UIcon name="i-icon-park-outline-down" class="duration-300 transition-all" :class="open ? '':'rotate-180'"></UIcon>
                      </div> 
             </UDropdownMenu>
            </div>
        </div>
    </header>
</template>