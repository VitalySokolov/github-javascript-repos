<template>
  <div id="app">
    <JavascriptRepositories />
  </div>
</template>

<script>
import JavascriptRepositories from './views/JavascriptRepositories'

export default {
  name: 'App',
  components: {
    JavascriptRepositories
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
