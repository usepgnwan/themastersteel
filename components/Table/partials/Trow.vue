<script setup lang="ts"> 

const props = defineProps({
    isHead: { type: Boolean, default: 'false' },
    id: {type:String, default:''}
});
</script>
<template>
    <tr :class="!props.isHead ?  'odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200':''" :id="props.id">
        <slot></slot>
    </tr>
</template>