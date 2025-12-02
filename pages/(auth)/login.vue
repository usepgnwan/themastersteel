<script setup lang="ts"> 
import { reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus' 

interface RuleForm {
  email: string
  password: string
  
}

const ruleFormRef = ref<FormInstance>() 
const form = reactive<RuleForm>({
  email: '',
  password: '' 
})

 
const rules = reactive<FormRules<RuleForm>>({
  
  email: [
    { required: true, message: 'Email wajib diisi', trigger: 'blur' },
    { type: 'email', message: 'Format email tidak valid', trigger: ['blur', 'change'] },
  ],

  password: [
    { required: true, message: 'Password wajib diisi', trigger: 'blur' },
    { min: 6, message: 'Password minimal 6 karakter', trigger: 'blur' },
  ],
})


const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
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
             
            <el-form-item prop="password" label="" inline-message="true" label-width="0" label-position="top" class="!w-full !p-0">
                 <PartialsInputFloating  
                        v-model:value="form.password"   
                        id="password" 
                        name="password"
                        label="Password"
                        type="input"
                        addClass="!pt-3 !w-full" 
                        classlabel="top-2  peer-focus:top-2'"
                    />
            </el-form-item>
             
            <el-form-item>
                <el-button type="primary" @click="onSubmit(ruleFormRef)" class="w-full">Login</el-button>
                 <p>Belum punya akun? <NuxtLink href="registrasi" class="text-blue-500 hover:text-blue-600"> klik disini</NuxtLink></p> 
            </el-form-item>
        </el-form> 
    </template>
</Auth>
</template>
