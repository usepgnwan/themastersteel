<script setup lang="ts"> 
definePageMeta({
    layout: 'auth',
    // middleware: ['admin']
});
import { reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus' 
//  "email": "string",
//   "name": "string",
//   "password": "string",
//   "phone": "string",
//   "role_id": 0,
//   "username": "string"
// }
interface RuleForm {
  name: string
  email: string
  phone: string
  role_id: number
  password: string
  
}

const ruleFormRef = ref<FormInstance>() 
const form = reactive<RuleForm>({
  name: '',
  email: '',
  password: '',
  phone : '',
  role_id : 2
})

 
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Nama Lengkap wajib diisi', trigger: 'blur' },
    { min: 3, max: 50, message: 'Nama harus 3–50 karakter', trigger: 'blur' },
  ],

  email: [
    { required: true, message: 'Email wajib diisi', trigger: 'blur' },
    { type:"email", message: 'Format email tidak valid', trigger: ['blur', 'change'] },
  ],
  phone: [
    { required: true, message: 'Nomer telp wajib diisi', trigger: 'blur' },
    {  message: 'Format Nomer telp tidak valid', trigger: ['blur', 'change'] },
  ],

  password: [
    { required: true, message: 'Password wajib diisi', trigger: 'blur' },
    { min: 6, message: 'Password minimal 6 karakter', trigger: 'blur' },
  ],
})



const {showToast} = useGlobal();
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async(valid, fields) => {
    if (valid) {
      
      try{
      
        let d = await useServerApi({action:"POST",url:"/api/dd/post/data",dataform:form, payload: {
              table : 'user',
              type_table : 'main', 
          }});
        if(d.status === 200 || d.status === 201){
          showToast('Lanjutkan Login!' , 'success')
          
          navigateTo('/login') 
        } else{
          return showToast("Terjadi kesalahan", "error")
        }
     }catch(e){ 
      if(e.response._data !== undefined && e.response._data.status == 409){
        showToast(e.response._data.error, "warning") 
      }else{
        showToast("Terjadi kesalahan", "error") 
      }
    }

    } else {
      console.log('error submit!', fields)
    }
  })
}
 
</script>
<template> 
<Auth>
    <template #body>
        <div>
            <h4 class=" font-semibold text-3xl">Registrasi</h4>
            <p class="text-gray-400">Registrasi at PT The Master Steel & get discount</p> 
        </div>
          <el-form 
            @submit.prevent="onSubmit(ruleFormRef)"
            ref="ruleFormRef" 
            :model="form"
            :rules="rules"
            label-width="auto" style="max-width: 600px">
            <el-form-item prop="name" label="" inline-message="true" label-width="0" label-position="top" class="!w-full !p-0">
                 <PartialsInputFloating  
                        v-model:value="form.name"   
                        id="name" 
                        name="name"
                        label="Nama Lengkap"
                        type="input"
                        addClass="!pt-3 !w-full" 
                        classlabel="top-2  peer-focus:top-2'"
                    />
            </el-form-item>
            <el-form-item prop="email" label="" inline-message="true" label-width="0" label-position="top" class="!w-full !p-0">
                 <PartialsInputFloating  
                        v-model:value="form.email"   
                        id="email" 
                        name="email"
                        label="Email"
                        type="input"
                        addClass="!pt-3 !w-full" 
                        classlabel="top-2  peer-focus:top-2'"
                    />
            </el-form-item>

            <el-form-item prop="phone" label="" inline-message="true" label-width="0" label-position="top" class="!w-full !p-0">
                 <PartialsInputFloating  
                        v-model:value="form.phone"   
                        id="phone" 
                        name="phone"
                        label="Nomer Telp/Wa"
                        type="input"
                        addClass="!pt-3 !w-full" 
                        classlabel="top-2  peer-focus:top-2'"
                    />
            </el-form-item>
             
            <el-form-item prop="password" label="" inline-message="true" label-width="0" label-position="top" class="!w-full !p-0">
                 <PartialsInputFloating  
                        v-model:value="form.password"   
                        id="password" 
                        name="password"
                        label="Password"
                        type="password"
                        addClass="!pt-3 !w-full" 
                        classlabel="top-2  peer-focus:top-2'"
                    />
            </el-form-item>
             
            <el-form-item>
                <el-button  type="primary" native-type="submit" class="w-full">Login</el-button>
                 <p>Sudah punya akun? <NuxtLink href="login" class="text-blue-500 hover:text-blue-600"> klik disini</NuxtLink></p> 
            </el-form-item>
        </el-form> 
    </template>
</Auth>
</template>
