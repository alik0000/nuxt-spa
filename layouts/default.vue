<template>
  <div class="app">
    <header>{{ headerTitle }}</header>
    <main>
      <slot/>
    </main>
  </div>
</template>

<script setup lang="ts">
const headerTitle = 'Header'
</script>
