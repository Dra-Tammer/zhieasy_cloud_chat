<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;

  ::-webkit-scrollbar {
    width: 0 !important;
  }

  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }
  overflow-y: hidden;
}
</style>
