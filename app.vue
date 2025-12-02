<script setup lang="ts">
  useHead({
    htmlAttrs: {
      lang: 'id',
    },
    charset: 'utf-8',
    title: 'Cart System',
    titleTemplate: title => (title !== 'Cart System' ? `${title} · The Master Steel` : title + ' · The Master Steel'),
 
  })
</script>
<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
