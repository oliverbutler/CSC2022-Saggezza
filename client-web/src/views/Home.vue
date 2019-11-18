<template lang="pug">
  .hello
    h1 Hello There!
    p Count: {{count}}
    button(@click="increment") Increase
    p(v-show='overTen') Over ten!!
</template>>

<script>
export default {
  name: 'home',
  computed: {
    count() {
      return this.$store.state.count;
    },
    overTen() {
      return this.$store.getters.overTen;
    }
  },
  methods: {
    increment() {
      this.$store.dispatch('increment', 1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
