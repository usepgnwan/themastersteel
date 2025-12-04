<script setup lang="ts">
import * as tb from './index'
const route = useRoute()
const router = useRouter()

const props = defineProps({
  loading: { type: Boolean, default: true },
  limit: { type: Number, default: 10 },
  page: { type: Number, default: 1 },
  total: { type: Number, default: 1 },
  show_paginate: { type: Boolean, default: true },
  show_filter: { type: Boolean, default: true }
})

const emit = defineEmits(['update:page', 'update:limit'])

const itemsPerpage = [10, 20, 50, 100]

 
const perPageLocal = ref(
  route.query.limit ? Number(route.query.limit) : props.limit
)

 
watch(perPageLocal, (val) => {
  router.replace({
    query: {
      ...route.query, 
      limit: val,
      page: 1
    }
  })
  emit("update:limit", val)
})

 
watch(
  () => route.query.page,
  (val) => {
    if (val !== undefined) emit("update:page", Number(val))
  },
  { immediate: true }
)
 
watch(
  () => route.query.limit,
  (val) => {
    if (val !== undefined) {
      const num = Number(val)
      emit("update:limit", num)
      perPageLocal.value = num // 👈 biar ref lokal ikut berubah
    }
  },
  { immediate: true }
)
</script>


<template>
    <div class="space-y-5">
        <div class="flex justify-between" v-show="show_filter">
            <div >
                show &nbsp;
                    <USelect v-model="perPageLocal" :items="itemsPerpage" class="w-24" size="md" :ui="{
                    content:'!w-24', 
                    }" />&nbsp;entries
            </div>
            <div>
                <slot name="filter"></slot>
            </div>
        </div>
        <div class="relative overflow-x-auto shadow-sm sm:rounded-md"> 
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"> 
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"  >
                    <slot name="head"></slot>
                </thead>
                <tbody class="relative" :class="props.loading ? 'h-40':''">
                    <slot name="body"></slot> 
                    <tr v-if="props.loading" class="absolute w-full h-full inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center">
                         <td class="text-center align-middle w-full" rowspan="10" colspan="20"> 
                            <UIcon name="i-eos-icons-three-dots-loading" class="text-pool-400 text-6xl"></UIcon>
                        </td>
                    </tr>
                    <tr v-if="props.total <=0" class="bg-white"  >
                        <td class="text-center align-middle w-full" rowspan="10" colspan="20"> 
                             <div class="h-52 flex items-center justify-center flex-col ">
                                <!-- <UIcon name="i-tabler-database-x" class="w-14 h-14"></UIcon> -->
                                <img src="@/assets/img/illustrations/empty-list.svg" alt="" />
                                Data Not Found
                             </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-between max-md:flex-wrap" v-show="show_paginate">
            <div class="flex space-x-2.5 items-center"> 
                <p>
                    Displaying <b   v-html="props.total > 0 ?perPageLocal : props.total"> </b> total <b>{{  props.total  }}</b> entries
                </p>
            </div>
            <div>
                <tb.Pagination  :total="props.total" :limit="perPageLocal" :page="props.page"></tb.Pagination>
            </div>
        </div>
    </div>
</template>




