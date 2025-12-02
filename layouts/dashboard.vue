<script setup lang="ts">
let {loading } = useDataPartial();  
</script>
<template> 

  <div class="fixed h-screen w-full flex items-center justify-center z-10 bg-elevated/35" v-if="loading" > 
      <UIcon name="i-eos-icons-bubble-loading" class="w-20 h-20 text-pool-400"></UIcon> 
  </div>
  <div class="fixed inset-0 flex overflow-hidden bg-[#f6f6f6]">
    <LayoutSideBar></LayoutSideBar>
    <div  class="  flex flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-default flex-1 overflow-y-auto sticky top-0" style=""> 
      <LayoutHeader></LayoutHeader>
      <div class="p-4">
          <slot />
      </div> 
    </div>
  </div> 
</template>