<template>
  <div id="app">
    <AppLayout/>
  </div>
</template>

<script>

import AppLayout from "@/layout/index.vue";

export default {
  name: 'App',
  components: {AppLayout}
}
</script>
<style>
#app {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
}
</style>
