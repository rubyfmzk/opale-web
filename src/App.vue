<template>
  <router-view></router-view>
</template>

<script>
import Mixin from '@/components/Common'
export default {
  name: 'App',
  mixins:[Mixin],
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
