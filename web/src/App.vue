<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { ensureAnonymousAuth } from './firebase/auth'

onMounted(async () => {
  try {
    await ensureAnonymousAuth()
  } catch (error) {
    console.error('Failed to authenticate:', error)
  }
})
</script>
