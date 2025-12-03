<script setup lang="ts"> 
import * as CryptoJS from 'crypto-js' 

definePageMeta({
    layout: 'auth',
    // middleware: ['admin']
});
import { reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus' 
import { convertTypeAcquisitionFromJson } from 'typescript';

interface RuleForm {
  user_contact: string
  password: string
  
}

const ruleFormRef = ref<FormInstance>() 
const form = reactive<RuleForm>({
  password: '',
  user_contact: ''
})

 
const rules = reactive<FormRules<RuleForm>>({
  
  user_contact: [
    { required: true, message: 'Email/No Telepon wajib diisi', trigger: 'blur' },
    { trigger: ['blur', 'change'] },
  ],

  password: [
    { required: true, message: 'Password wajib diisi', trigger: 'blur' },
    { min: 6, message: 'Password minimal 6 karakter', trigger: 'blur' },
  ],
})


const {showToast} = useGlobal();
let rememberMe = ref<Boolean>(false)
let formLoading = ref<Boolean>(false)
let errorForm  = ref({user_contact:""})
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) { 
        try{ 
            const d = rememberMe.value ? 31 : 1;
          
            let { sessionUser } = useCookiedata(d); 
            const config = useRuntimeConfig();
            const encrypted = CryptoJS.AES.encrypt(JSON.stringify(form), config.public.secretForm).toString(); 
            let r = { data : encrypted }
            let data = await $fetch('/api/dd/auth/login', {
                    method: 'POST',
                    body: r
                });
            
            
            formLoading.value = false; 
            const role = data?.data.data.role.id;
            const token = data.data.token;
            if (role === 1){
              sessionUser.value = token;
              navigateTo('/dashboard', { external: true }) 
            }else if(role ===2){
              navigateTo('/', { external: true }) 
            }
            showToast("Login berhasil", "success")
        }catch(e){ 
            formLoading.value = false;
            let msg = "Terjadi kesalahan server"
            let type = "error"
            const code = e.response?.status ;
            const data = e.response?._data 
            if(code ==400){
                msg = 'Periksa kembali form isian'
                type='warning'
            }else if (code == 401){
                msg = 'User tidak ditemukan'
                  console.log(data)
                if(data.data !== undefined){
                    msg = 'Periksa kembali form isian' 
                    errorForm.value.user_contact = "user / password tidak ditemukan"
                }
                type='warning'
            }
            showToast(msg, type)
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
            <h4 class=" font-semibold text-3xl">Login</h4>
            <p class="text-gray-400">Login at PT The Master Steel & get discount</p> 
        </div>
          <el-form 
            ref="ruleFormRef" 
            :model="form"
            :rules="rules"
            label-width="auto" style="max-width: 600px">
            <el-form-item prop="user_contact" label="" inline-message="true" label-width="0" label-position="top" class="!w-full !p-0">
                 <PartialsInputFloating  
                        v-model:value="form.user_contact"   
                        id="user_contact" 
                        name="user_contact"
                        label="Email/No Telepon"
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
             
            <PartialsErrorForm :status="errorForm.user_contact !== ''" :title="errorForm.user_contact" /> 
            <div class="flex justify-between mb-3">
                <UCheckbox label="Remember me" v-model="rememberMe"/> 
            </div>
            <el-form-item>
                <el-button  :disabled="formLoading" type="primary" @click="onSubmit(ruleFormRef)" class="w-full">Login</el-button>
                 <p>Belum punya akun? <NuxtLink href="registrasi" class="text-blue-500 hover:text-blue-600"> klik disini</NuxtLink></p> 
            </el-form-item>
        </el-form> 
    </template>
</Auth>
</template>
