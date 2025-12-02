<script setup lang="ts">

import * as Lmain from "~/components/MainLayout";
</script>

<template>
  <Lmain.Header/>
  <div> 
    <slot />
  </div>
  <Lmain.Footer />
</template>

<style scoped></style>
