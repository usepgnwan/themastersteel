<!-- components/FloatingInput.vue -->
<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'floating_outlined' },
  name: { type: String, default: '' },
  label: { type: String, default: 'Floating outlined' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  autocomplete: { type: String, default: 'on' },
  required: { type: Boolean, default: false },
  value: { type: String, default: '' },
  maxlength: { type: [String, Number], default: '' },
  minlength: { type: [String, Number], default: 0 },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  statFloat: { type: Boolean, default: true },
  addClass: { type: String, default: '' },
  classlabel :  { type: String, default: '' },
})

const emits = defineEmits(['update:value'])

const isActive = computed(() => {
  return props.value !== '' &&  props.value !== null
})

const onInput = (event: Event) => {
  emits('update:value', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="relative w-full">
    <input
      :id="props.id"
      :name="props.name"
      :type="props.type"
      :placeholder="props.placeholder"
      :readonly="props.readonly"
      :maxlength="props.maxlength"
      :minlength="props.minlength"
      :disabled="props.disabled"
      :autocomplete="props.autocomplete"
      :required="props.required"
      :value="props.value"
      @input="onInput"
      class="block px-2.5 "
      :class="[
        props.statFloat ? 'pb-2.5' : 'p-2',
        'w-full text-sm bg-white rounded-lg border border-gray-300 appearance-none',
        'dark:text-white dark:border-gray-600 dark:focus:border-pool-400',
        'focus:outline-none focus:border-pool-100 peer focus:ring focus:ring-pool-100/25 focus:ring-offset-0',
        props.statFloat ? 'text-gray-900' : 'text-gray-500',
        props.addClass
      ]"
    />
    <label
      v-if="props.statFloat"
      :for="props.id"
      class="absolute text-gray-500 duration-300 transform  -translate-y-4  z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 pr-4 peer-focus:px-2 peer-focus:pr-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2   peer-focus:text-pool-400 peer-focus:text-[10px] peer-focus:-translate-y-4 rtl:peer-focus:left-auto start-1 w-full"
      :class="[
        isActive ? 'text-[10px]' :'text-sm', 
        classlabel === '' ? 'top-[1.2rem] peer-focus:top-[1.2rem]' :   classlabel  ,
      ]"
      v-html="props.label"
    ></label>
  </div>
</template>
