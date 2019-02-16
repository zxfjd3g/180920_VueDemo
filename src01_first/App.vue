<template>
  <div>
    <h2>App Component</h2>

    <img class="logo" src="./assets/logo.png" alt="logo">
    <HelloWorld/>
  </div>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  components: {
    HelloWorld
  }
}
</script>
<style>
  .logo {
    width: 300px;
    height: 300px;
  }
</style>
