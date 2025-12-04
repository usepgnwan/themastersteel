<script setup lang="ts">
 
const props = defineProps({ 
    page: {type:Number, dafault:1},
    total : {type:Number, dafault:1},
    limit : {type:Number, dafault:10},
});

const page = ref(props.page ?? 1)




const route = useRoute()

function to(page: number) {
  return {
    query: {
    ...route.query,
      page
    } 
  }
}



watch(
  () => route.query, // pakai getter function
 async (newQuery) => { 
    if(newQuery.page !== undefined){
        page.value = parseInt(newQuery.page) 
    }else{
         page.value = 1;
    }
   
  },
  { deep: true }
)


onMounted(async()=>{
    if(route.query.limit !== undefined){ 
        page.value = parseInt(route.query.page);
    } 
});

</script>
<template>
    <UPagination v-model:page="page" :total="props.total" :itemsPerPage="props.limit" :to="to" :sibling-count="1" show-edges  active-color="warning"
    :ui=" {
        item:'!ring-0',
        list: 'flex items-center gap-1 ',
        ellipsis:'!border-none !ring-0',
        first:'!ring-0',
        prev:'!ring-0',
        next:'!ring-0',
        last:'!ring-0',
    }"
    />
</template>