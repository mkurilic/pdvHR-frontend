<template>
  <div id="app">
    <app-nav-bar />
    <router-view />
  </div>
</template>

<script>
  import NavBar from './components/partials/NavBar.vue';
  export default {
    name: 'app',
    components: {
      'app-nav-bar':NavBar
    }
  };
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

