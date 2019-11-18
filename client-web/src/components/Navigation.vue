<template lang="pug">
#nav
  router-link(to='/') Dashboard
  router-link(to='/about') About
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang="scss">
#nav {
  a {
    padding: 10px;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>