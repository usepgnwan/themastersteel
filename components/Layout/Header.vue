<script setup lang="ts">
let {hbar,title_header} = useSideBarData();

watch(hbar, (newVal, oldVal) => { 
   hbar.value = newVal;
})



import type { DropdownMenuItem } from '@nuxt/ui'
import { useGlobal } from '~/composables/useGlobal';


const showDownloads = ref(false)

const { $auth_user } = useNuxtApp()
 
const items = computed(() => [
  {
    label: $auth_user.value.name ?? '',
    icon: 'i-gg-profile' ,
    type: 'label' as const
  }, 
  {
    type: 'separator' as const
  }, 
  {
    label: 'Keluar',
    icon: 'i-material-symbols-logout',
    // type: 'checkbox' as const,
    checked: showDownloads.value,
    onSelect() { 
        const {showToast} = useGlobal(); 
        showToast("logout berhasil", "success")
        return navigateTo('/auth/login')
    }
  }
] satisfies DropdownMenuItem[])

let open = ref<Boolean>(false)


let {loading } = useDataPartial(); 


let imgSrc = ref('')
// const roleId = $auth_user?.role_id ?? 1;

onMounted(async () => {
  const url = '';

  try {
    const res = await fetch(url, { method: 'HEAD' })
    imgSrc.value = res.ok ? url : '/img/icon/1.png'
  } catch {
    imgSrc.value = '/img/icon/1.png'
  }
})
</script>

<template>
    <div class="bg-[#f6f6f6] h-(--ui-header-height) z-30 shrink-0 flex items-center justify-between  px-4 sm:px-6 gap-1.5 sticky top-0   border-b border-default"> 
        <div class="flex justify-between w-full">
          <div class="flex space-x-2 items-center">
            <button class="leading-none cursor-pointer" @click="hideSidebar">
              <UIcon :name="hbar ? 'i-mynaui-panel-right-close-solid' : 'i-mynaui-panel-left-close-solid' " class="w-6 h-6" />
            </button>
            <div class="font-semibold capitalize" > 
              <div  class=" h-3 inset-0 w-24 bg-gray-200 animate-pulse rounded-lg" v-if="loading"></div> 
              <p v-html="title_header"  v-if="!loading"></p>  
            </div>
          </div>
          <div class="flex items-end space-x-3">

            <UDropdownMenu :items="items" :content="{ align: 'start' }" :ui="{ content: 'w-48' }" v-model:open="open"> 
                      <div class="rounded-3xl px-3 py-1  shadow text-white  bg-gradient-to-r from-black to-black/75 items-center flex space-x-2 cursor-pointer">
                    
                        <NuxtImg format="webp"  :src="imgSrc" width="30" placeholder v-if="imgSrc !== ''"/>
                        <div class="flex flex-col px-1">
                         
                          <p class="text-sm flex items-center space-x-4">
                            <UIcon name="i-gg-profile"></UIcon>
                            {{$auth_user.name ?? ""}}
                          </p> 
                          <small class="text-[10px]">{{ $auth_user.user_roles.deskripsi ?? "" }}</small>
                        </div>
                        <UIcon name="i-icon-park-outline-down" class="duration-300 transition-all" :class="open ? '':'rotate-180'"></UIcon>
                      </div>
                      
                 
            </UDropdownMenu>
          </div>

        </div>
    </div>
</template>