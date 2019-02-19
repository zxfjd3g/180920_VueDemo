<template>
  <div>
    <div>click {{count}}, count is {{evenOrOdd}}</div>
    <br>
    <div>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="incrementIfOdd">increment if odd</button>
      <button @click="incrementAsync">increment async</button>
    </div>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {

    /*computed: {
      count () {
        return this.$store.state.count
      },
      evenOrOdd () {
        return this.$store.getters.evenOrOdd
      },
    },*/

    computed: {
      ...mapState(['count']),  // {count (count () {return this.$store.state.count}) }
      ...mapGetters(['evenOrOdd']), // {evenOrOdd () {return this.$store.getters.evenOrOdd}}
    },

    mounted() {
      console.log('mounted', this)
    },

    /*methods: {
      increment() {
        console.log('---')
        this.$store.dispatch('increment')
      },
      decrement() {
        this.$store.dispatch('decrement')
      },
      incrementIfOdd() {
        this.$store.dispatch('incrementIfOdd')
      },
      incrementAsync() {
        this.$store.dispatch('incrementAsync')
      },
    }*/

    methods: {
      ...mapActions(['increment', 'decrement', 'incrementIfOdd', 'incrementAsync']) // {}
    }
  }
</script>
<style>

</style>
