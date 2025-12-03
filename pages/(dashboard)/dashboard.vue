<script lang="ts" setup>
definePageMeta({
    layout: 'dashboard',
    middleware: ['admin']
});
const { $auth_user } = useNuxtApp()
 
</script>

<template>
    <div>
        <p class="text-2xl bg-elevated/50"> Welcome, {{ $auth_user.name ?? "" }}</p>
    </div>
</template>