<script setup lang="ts">
    const props = defineProps({
        loading:{type:Boolean, default:false},  
        data: { type: Object as PropType<any>, default: () => ([]) }, 
    });
</script>
<template> 
        <div class="min-h-screen flex items-center justify-center" v-if="!loading && data.length == 0">
            <h1 class="text-3xl font-bold">Produk Belum Tersedia</h1>
        </div>
</template>