<script setup lang="ts"> 

const props = defineProps({
    isHead: { type: Boolean, default:false },
    isSort: { type: Boolean, default:false },
    sort_by: { type: String},
    numsort: { type: Number, default:0},
    class : {type : String, default:'px-6 py-3'},
    colspan: { type: Number, default:0},
});
let sort =  ref(props.numsort)
let icon = ref<String>('i-ep-sort')
let tsort: string | null = null

const emit = defineEmits<{
  (e: 'sort', payload: { tsort: string | null; id: string | number; sort: number; icon: string }): void
}>()

const route = useRoute()
const router = useRouter()

function getSort() {
  sort.value += 1 
  if (sort.value === 0) {
    icon.value = 'i-ep-sort'
    tsort = null
  } else if (sort.value === 1) {
    icon.value = 'i-bi-sort-up'
    tsort = 'asc'
  } else if (sort.value === 2) {
    icon.value = 'i-bi-sort-down-alt'
    tsort = 'desc'
  }

  if (sort.value >= 3) {
    icon.value = 'i-ep-sort'
    sort.value = 0
    tsort = ''
  }

  emit('sort', { tsort, id: props.sort_by, sort, icon }) 
  let newQuery = { ...route.query }

  if (tsort && tsort !== '') {
    newQuery[props.sort_by] = tsort
  } else {
    delete newQuery[props.sort_by]
  }
 
  router.replace({
      query: {
        ...newQuery, 
      }
  })
 
}


</script>

<template>

    
    <th scope="col" :class="class" v-if="isHead && isSort" @click="getSort" :colspan="colspan"> 
        <div class="flex space-x-0.5 items-center"> 
            <div>
                 <slot></slot>
            </div>
            <UIcon :name="icon" class="text-gray-400 hover:text-black"></UIcon>
        </div>
       
    </th>
    <th scope="col" :class="class" v-if="isHead && !isSort" :colspan="colspan">
        <slot></slot>
    </th>
    <td scope="col" :class="class"  v-if="!isHead" :colspan="colspan">
        <slot></slot>
    </td>
</template>