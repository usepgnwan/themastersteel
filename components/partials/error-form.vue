
<script setup lang="ts">
const props =  defineProps({
    status : {type: Boolean, default:false},
    title: {type: String, default:''}
})
</script>
<template>
    <small class="text-red-700 text-xs" v-if="status">{{ title }}</small>
</template>