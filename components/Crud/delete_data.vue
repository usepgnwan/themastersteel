<script setup lang="ts">

    const {showToast} = useGlobal();
    const emit = defineEmits(['update:open','submit'])
    const props = defineProps({
        open: { type: Boolean, default: false }, 
        id : { type: null as any},
        link : { type: String },
        type_link : { type: String , default:'role'},
    })

    const openMe = computed({
        get: () => props.open,
        set: (value) => {
            emit('update:open', value) 
        }
    });
    const submitData = async () =>{

        let link = '/api/dd/delete/data/';
        
        let uri = new URLSearchParams(); 

        let payload = { 
            table: props.link,
            type_table: props.type_link
        }
      
        if( props.id !== undefined && props.id !== 0 &&  props.id !== null){ 
            payload.id = props.id
        }  
        console.log(props)
        console.log(payload)
        // let encrypt = usePayloadData(payload)  
        
        // uri.set('payload', encrypt.payload.toString())
        // link = link +"?"+uri;

        try{
            //   let d = await $fetch(link, {
            //           method: 'POST', 
            //       });
                let d = await useServerApi({action:"POST",url:link,  payload:payload});

                if(d.status !== 200){
                    return showToast("Terjadi kesalahan", "error")
                }  
                openMe.value =false;
                emit('submit');
                showToast('Data berhasil dihapus' , 'success')
            }catch(e){
                if(e.response._data !== undefined && e.response._data.status == 409){
                    showToast(e.response._data.error, "warning") 
                }else{
                    showToast("Terjadi kesalahan", "error") 
                } 
            }
        
      emit('submit');
    }
</script>

<template>
    <UModal v-model:open="openMe"> 
      <template #content="{ close }">
           <div class="w-full h-44 flex items-center justify-center flex-col space-y-6 p-9">
              <div class="text-center">
               <h2  class="text-2xl font-bold"> Yakin hapus data ini?</h2>
               <p class="text-gray-400">data akan terhapus & tidak dapat dikembalikan</p>
              </div>
              <div class="flex space-x-2" >
                <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
                <UButton label="Hapus" color="warning" v-on:click="submitData" />
              </div>
           </div>
      </template>
  </UModal>

  
</template>