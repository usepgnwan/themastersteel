<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';
 
const props = defineProps({
    open:{type:Boolean, default:false},
    title:{type:String, default:"Open Modal"},
    size: {type: String , default:"md"},
    footer_hide : { type:Boolean, default:true },
    ruleForm: { type: Object as PropType<any>, default: () => ({}) },
    rules: { type: Object as PropType<any>, default: () => ({}) },
    link : { type: String },
    type_link : { type: String , default:'role'},
    method_type: { type: String , default:'patch'},
    id : { type: null as any},
    is_multipartform : {type:Boolean, default:false},
});
const emit = defineEmits(['update:open','update:ruleForm','submit']);


const {showToast} = useGlobal();
const openMe = computed({
    get:()=>props.open,
    set:(val)=>{ 
        emit('update:open', val); 
    } 
})

 
let sizes = {
  "md":"!w-md",
  "lg":"!w-lg",
  "xl":"!w-xl",
  "2xl":"!w-2xl",
  "3xl":"!w-3xl",
  "4xl":"!w-4xl",
}
 
const pikSize = sizes[props.size]; 
const ruleFormRef = ref<FormInstance>()
 
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    const data = fields;
  
        if (valid) { 
          let link = '/api/dd/post/data';
          let payload = { 
              table: props.link,
              type_table: props.type_link,
              method_type: props.method_type
          }
          if( props.id !== undefined && props.id !== 0 &&  props.id !== null){ 
              payload.id = props.id
          }  
      
          let d = await useServerApi({action:"POST",url:link,dataform:props.ruleForm, payload:payload});
          if(d.status === 200 || d.status === 201){
            emit('submit');
            showToast('Data berhasil disimpan' , 'success')
            resetForm()
          } else{
            return showToast("Terjadi kesalahan", "error")
          }
        } else {
      
          showToast('Periksa kembali form isian' , 'warning')
        }
   

  })
} 
 
const resetForm = () => {
  
  const newForm = { ...props.ruleForm} 
  Object.keys(newForm).forEach(key => {
    const val = newForm[key] 
    if (Array.isArray(val)) {
      newForm[key] = []
    } else if (typeof val === 'object' && val !== null) {
      newForm[key] = {}
    } else {
      newForm[key] = ''
    }
  })  
  openMe.value = false; 
  console.log(newForm)
  emit('update:ruleForm', newForm)
}

</script>
<template>
    <div> 
    <el-dialog  v-model="openMe"  :title="props.title"     overflow  :class="pikSize">
        <el-form
            ref="ruleFormRef"
            style="max-width: 600px"
            :model="ruleForm"
            :rules="rules"
            label-width="auto"
        >
        <div>
          <slot name="data-form"></slot>
        </div>
        </el-form>
        <template #footer>
            <div class="dialog-footer flex items-center space-x-2 justify-end">
            <el-button   @click="resetForm()">Cancel</el-button>
            <UButton label="Simpan" color="warning" type="submit"  @click="submitForm(ruleFormRef)" v-if="footer_hide" />
            </div>
        </template>
    </el-dialog>
    </div>
</template>