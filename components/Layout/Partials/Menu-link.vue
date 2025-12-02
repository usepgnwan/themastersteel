<script setup lang="ts"> 
import type { itemMenu } from '~/interface'; 
const route = useRoute()
let props =defineProps<{
    item : itemMenu,
    ismobile: boolean
}>()
let uri = ref<string>(route.fullPath) 
// const localItem = ref(props.item);


const data = { 
    label: "",
    icon: "",
    class: "",
    to: "",
    parent_to: "",
    active: false,
    defaultOpen : false,
    children: [],
}
let localItem = ref<itemMenu>(data)

let {title_header} = useSideBarData();
let label_header = ref<String>('')
watch(() => route.fullPath, (newPath) => {
  uri.value = newPath
  renewMenu(uri.value, localItem.value) 
})
 

onMounted(()=>{ 
  localItem.value = props.item
  renewMenu(uri.value, localItem.value);
  label_header.value = findLabelByTo(localItem.value, route.fullPath) ?? ''; 

  if(label_header.value !== ''){
    title_header.value = label_header.value;
  }
})


watch(() => props.item, (v) => {
  renewMenu(uri.value, v)
}, { immediate: true })

function renewMenu(newPath: string, item: itemMenu) {
  if (item.children) {
    item.active = false;
    const updatedChildren = item.children.map((child) => ({
      ...child,
      active:  newPath.startsWith(child.to),
      class:  newPath.startsWith(child.to)
        ? '!text-primary before:!bg-elevated/50'
        : 'text-white hover:!text-primary hover:!bg-elevated/50',
    }))
 
    localItem.value = {
      ...item,
      active: newPath.startsWith(item.parent_to ?? ''),
      class: item.active ? '!text-primary  before:!bg-elevated ' : '',
      defaultOpen:  !item.defaultOpen ?  newPath.startsWith(item.parent_to ?? '') : item.defaultOpen,
      children: updatedChildren,
    }
  } else {
    localItem.value = { ...item }
  }

 
 
  label_header.value = findLabelByTo(localItem.value, newPath) ?? ''; 
 
}

watch(label_header, (val)=>{
  if(val !== ''){
    title_header.value = val;
  }
})
function findLabelByTo(menu: any, to: string): string | null {
    if(menu.to === to){
      return menu.label;
    }
    
    if(to.startsWith(menu.to)){
      return menu.label;
    }
    if (menu.children && menu.children.length) {
      const label = searchInData(menu.children, to)
      if (label) return label
    }
 
  return null
}
function searchInData(data: any[], to: string): string | null {
  for (const item of data) {
    if (item.to === to) {
      return item.label
    }
    if (item.children && item.children.length) {
      const found = searchInData(item.children, to)
      if (found) return found
    }
  }
  return null
} 
</script>
<template>

        <ul class="isolate min-w-0 space-y-1.5 mb-1 " orienta v-if="localItem.children == null"> 
          <li data-state="closed" data-orientation="vertical" class="min-w-0">  
            <NuxtLink :href="localItem.to" class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1]  rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-primary flex-row px-2.5 py-1.5 before:inset-y-px " v-if="!ismobile" :class="uri.startsWith(localItem.to) ? 'text-primary bg-elevated':'text-white hover:text-primary hover:bg-elevated'" >
                <UIcon :name="localItem.icon" class="h-5 w-5" />
                <span class="truncate">{{ localItem.label }}  </span>   
            </NuxtLink> 
            <!-- saat button hide full --> 
            <UTooltip
                :content="{
                  align: 'center',
                  side: 'right',
                  sideOffset: 8
                }" 
                v-if="ismobile" 
              >

             
                <UButton  variant="subtle" :class="uri === localItem.to ? 'text-primary bg-elevated' : 'text-white hover:text-primary hover:!bg-elevated !bg-transparent !ring-0 active:!bg-transparent '"  > 
                <slot name="label">
                    
                    <UIcon :name="localItem.icon" class="h-5 w-5" />
                </slot>
                </UButton>
                <template #content>
                  <div class="py-3 px-1 ">
                      <NuxtLink :to="localItem.to"
                        class="block  cursor-pointer"
                        :class="localItem.to == uri ? 'text-primary':'hover:text-primary'"
                      >  {{ localItem.label }}   </NuxtLink> 
                  </div> 
                </template>
                 
              </UTooltip> 
          </li> 
        </ul> 
     
 
      <UNavigationMenu orientation="vertical"
                        :items="[localItem]"
                        v-if="localItem.children != null && !ismobile"
                        class="data-[orientation=vertical]:w-full mb-1" 
                        >
                <!-- <template #item="{ item }">

                     
                      <div class="w-full h-full px-2.5 py-1.5 "  @click="handleClick(item)" v-if="item.children == null">
                        {{ item.label }}
                      </div>
                    </template> -->
        </UNavigationMenu>

         <ul class="isolate min-w-0 space-y-1.5 mb-1" orienta  v-if="localItem.children != null && ismobile"> 
          <li data-state="closed" data-orientation="vertical" class="min-w-0">  
            <NuxtLink :href="localItem.to" class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1]  rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-primary flex-row px-2.5 py-1.5 before:inset-y-px text-white hover:text-primary hover:bg-elevated" v-if="!ismobile" >
                <UIcon :name="localItem.icon" class="h-5 w-5" />
                <span class="truncate">{{ localItem.label }}</span>   
            </NuxtLink> 
            <!-- saat button hide full --> 
            <UTooltip
                :content="{
                  align: 'center',
                  side: 'right',
                //   sideOffset: 8
                 
               
                }" 
                v-if="ismobile"  
                :ui="{ content:'!h-auto !w-auto !flex-wrap !flex-col'}"
              >    
            
                <UButton  variant="subtle" :class="uri.startsWith(localItem.parent_to) ?  ' text-primary  !bg-elevated   !ring-0 ' : 'text-white hover:text-primary hover:!bg-elevated !bg-transparent !ring-0 active:!bg-transparent '"  > 
                <slot name="label">
                    <UIcon :name="localItem.icon" class="h-5 w-5" />
                </slot>
                </UButton>
                <template #content>  
                        <div class="flex flex-col relative px-1 py-0.5 space-y-1">
                       
                            <p class="  font-semibold mb-1">{{ localItem.label }}</p>  
                            <NuxtLink v-for="(value, index) in localItem.children"
                                :to="value.to"
                                :key="index"
                                class="block  cursor-pointer"
                                :class="value.to == uri ? 'text-primary':'hover:text-primary'"
                                >
                                {{ value.label }}
                            </NuxtLink>
                         
                        </div>
                     
                </template>
                 
              </UTooltip> 
          </li> 
        </ul>
</template>