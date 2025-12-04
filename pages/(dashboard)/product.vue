<script setup lang="ts"> 
definePageMeta({
    layout: 'dashboard',
    middleware: ['admin']
});
import  * as tb from '~/components/Table'  
import ModalPlus from '~/components/Crud/modal-plus.vue';
import type { FormRules } from 'element-plus';
 
const {showToast} = useGlobal();
const route = useRoute()
const router = useRouter()

let row = ref<any[]>([])
let limit = ref<Number>(10)
let page = ref<Number>(1)   
let total = ref<Number>(1)  
let search = ref<String>('')
const getValue = debounceValue( async (val: string, callback: (result: any) => void) => { 
    return callback(val);
}, 300);

watch(search,async (val) => { 
    const callbackBounce = (v:any)=>{
    router.replace({
            query: {
                ...route.query, 
                search: v,
                page:1
            }
        })
    }
    getValue(val,callbackBounce) 
   
});

 
let loading = ref<Boolean>(true);

const getData = async ()=>{
    loading.value = true; 
    let data = {
        table : 'product',
        type_table : 'main',
        page : page.value,
        limit : limit.value,
        title : '',
    }

    if(search !==''){
        data.title = search.value
    }else{
        data.title = ''
    }
 
    try{ 
        let d = await useServerApi({action:"GET",url:'/api/dd/get/data', payload:data})
 
        if(d.status !== 200){
            return showToast("Terjadi kesalahan", "error")
        } 
        let r = d.data.data;
        total.value = r.total;
        row.value = r.rows !== undefined ? r.rows : [];
     }catch(e){
         console.log(e)
         return showToast("Terjadi kesalahan", "error") 
    }
}
watch(
  () => route.query, // pakai getter function
 async (newQuery) => { 
    if(newQuery.page !== undefined){
        page.value =parseInt(newQuery.page);
    }else{
         page.value = 1;
    }
    // console.log(newQuery);
    if(newQuery.limit !== undefined){
        limit.value = parseInt(newQuery.limit); 
    }else{
         limit.value =10;
    }
  
    await getData().finally(()=>{loading.value = false}); 
  },
  { deep: true }
)

onMounted(async()=>{
    await getData().finally(()=>{loading.value = false}); 
});

let openModal = ref(false) 
let openAssetModal = ref(false) 
let title_modal = ref('Add Data Product')
 
let link = "product";
let method_type = ref("POST");
let id = ref<Number>(0);


interface RuleFormImage {
  tbl_product_id: string 
  filename: string 
  src: File | null
}
const ruleFormImage = ref<RuleFormImage>({
  tbl_product_id: '', 
  filename: '', 
  src: null
})

async function clickMe(idx:string | null= null){ 
    id.value = 0;
    console.log(idx)
    if(idx !== null){
        ruleFormImage.value.tbl_product_id = idx
        openAssetModal.value = true
        return;
    }
    openModal.value = true;
    
    method_type.value = "POST"
    title_modal.value = "Add Data Product"

}
 
async function triggerAfterSave() {
    loading.value = true;
    await getData().finally(() => {
        loading.value = false;
    });
}
 
interface RuleForm {
  deskripsi: string 
  category: string 
  title: string 
  harga: number 
}
const ruleForm = ref<RuleForm>({
  deskripsi: '', 
  category: '', 
  title: '', 
  harga: 0, 
})
 
const rules = ref<FormRules<RuleForm>>({
  deskripsi: [
    { required: true, message: 'Deskripsi wajib diisi', trigger: 'blur' },
    { min: 3, message: 'Minimal 3 karakter', trigger: 'blur' },
  ], 
  title: [
    { required: true, message: 'Title wajib diisi', trigger: 'blur' },
    { min: 3, message: 'Minimal 3 karakter', trigger: 'blur' },
  ], 
  harga: [
    { required: true, message: 'Harga wajib diisi', trigger: 'blur' },
    { min: 3, message: 'Minimal 3 karakter', trigger: 'blur' },
  ], 
})
   
const options = [
  {
    value: 'Bar',
    label: 'Bar',
  },
  {
    value: 'Wire',
    label: 'Wire',
  },
  {
    value: 'Ibeam',
    label: 'Ibeam',
  },
  {
    value: "Upn Channel",
    label: "Upn Channel",
  },
  {
    value: "Equal Angle",
    label: "Equal Angle",
  },
]

const rulesimages = ref<FormRules<RuleFormImage>>({
   
  src: [
    { required: true, message: 'Foto wajib diisi', trigger: 'change' },
  ]
})

const handleFile = (e) => {
  const file = e.target.files?.[0] ?? null
  if (!file) return

  // simpan nama file-nya
  ruleFormImage.value.filename = file.name

  const reader = new FileReader()

  reader.onload = () => {
    const base64 = reader.result 
   
    ruleFormImage.value.src = base64
    console.log( ruleFormImage)
  }

  reader.readAsDataURL(file)
}

</script>

<template>

    <div class="p-4 bg-white rounded-2xl">
        <tb.Table :loading="loading" :total="total" :limit="limit"  :page="page">
            <template #filter>
                <div class="w-full flex  space-x-2.5">
                    <div>
                        <partials-input-floating name="search" id="search" v-model:value="search" :stat-float="false" placeholder="cari..." label="cari..."></partials-input-floating>
                    </div>
                    <div>
                        <!-- <button class="bg-pool-300 text-white px-4 py-1.5 rounded-lg hover:bg-pool-300/85">tambah</button> -->
                       <el-button   type="primary" @click="clickMe(null)">
                            <UIcon name="i-material-symbols-add-rounded"/>
                            <span>Tambah</span>
                       </el-button>
                    </div>
                </div>
            </template>
            <template #head>
                <tb.TR :isHead="true">
                    <tb.TD class="px-1 text-center" :isHead="true">.::.</tb.TD>
                    <tb.TD class="px-1" :isHead="true">No.</tb.TD>
                    <tb.TD  :isHead="true">Title</tb.TD>  
                    <tb.TD  :isHead="true">Slug</tb.TD>  
                    <tb.TD  :isHead="true">Deskripsi</tb.TD>  
                    <tb.TD  :isHead="true">Foto</tb.TD>  
                </tb.TR>
            </template>
            <template #body>
                <tb.TR :isHead="false"  v-for="(value, index) in row" :key="index">
                    <tb.TD class="px-1 text-center  w-28">
                        <div class="flex space-x-2 px-4 py-2">
                        <el-button type="success" @click="clickMe(value.id)" class="!text-xs !px-2">
                            <UIcon name="i-material-symbols-add-rounded"/>
                            <span>Add Foto</span>
                        </el-button>
                        </div>
                    </tb.TD>
                    <tb.TD class="px-1  w-12"> {{ (page - 1) * limit + (index + 1) }}</tb.TD>
                    <tb.TD > {{ value.title }}</tb.TD>
                    <tb.TD > {{ value.slug }}</tb.TD>
                    <tb.TD > {{ value.deskripsi }}</tb.TD>
                    <tb.TD >  
                        <div class="flex space-x-2">
                            <div class="h-16 w-16 border border-gray-100 " v-for="(v,k) in value.product_image" :key="k">
                                <NuxtImg format="webp" :src="v.src" class="w-full h-full object-cover aspect-square" /> 
                            </div>
                        </div>

                    </tb.TD>
                </tb.TR>
            </template>
        </tb.Table>
        
    </div>
 
    <ModalPlus 
             v-model:open="openModal"
             v-model:ruleForm="ruleForm"
             :title="title_modal" 
             :rules="rules"
             type_link="main"
             :link="link"
             :id="id"
             :method_type="method_type"
            @submit="triggerAfterSave"
    >
        <template #data-form>
            <el-form-item prop="title" label-width="0" label-position="top" class="!w-full !p-0" inline-message="true"> 
                <PartialsInputFloating  
                        v-model:value="ruleForm.title"   
                        id="title" 
                        name="title"
                        label="Title"
                        type="input"
                        addClass="!pt-3 !w-full" 
                        classlabel="top-2  peer-focus:top-2'"
                    />
            </el-form-item>
             <el-form-item prop="title" label-width="0" label-position="top" class="!w-full !p-0" inline-message="true"> 
                    <el-select v-model="ruleForm.category" placeholder="Select" style="width: 240px">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
             </el-form-item>
  
            <el-form-item prop="deskripsi" label-width="0" label-position="top" class="!w-full !p-0" inline-message="true"> 
                <PartialsInputFloating  
                        v-model:value="ruleForm.deskripsi"   
                        id="deskripsi" 
                        name="deskripsi"
                        label="Deskripsi"
                        type="input"
                        addClass="!pt-3 !w-full" 
                        classlabel="top-2  peer-focus:top-2'"
                    />
            </el-form-item>
             
            <el-form-item prop="harga" label-width="0" label-position="top" class="!w-full !p-0" inline-message="true"> 
                <PartialsInputFloating  
                        v-model:value="ruleForm.harga"   
                        id="harga" 
                        name="harga"
                        label="Harga"
                        type="number"
                        addClass="!pt-3 !w-full" 
                        classlabel="top-2  peer-focus:top-2'"
                    />
            </el-form-item>
             
        </template>
    </ModalPlus>
 
    <ModalPlus 
            v-model:open="openAssetModal"
            v-model:ruleForm="ruleFormImage"
            title="Add Foroto" 
            :rules="rulesimages"
            type_link="main"
            :link="'product-images'"
            :id="id"
            :method_type="method_type"
             @submit="triggerAfterSave" 
    >
        <template #data-form> 
            <el-form-item prop="src" label-width="0" label-position="top" class="!w-full !p-0" inline-message="true"> 
               <UInput
                        type="file"
                        accept="image/*"
                        @change="handleFile"
                        clearable
                        />
            </el-form-item>
             
        </template>
    </ModalPlus>
 
</template>