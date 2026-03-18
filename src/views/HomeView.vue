<template>
  <button @click="startGame">Play</button>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'

export default {
  name: 'HomeView',

  setup() {
    return { store: useGameStore() }
  },

  methods: {
    startGame() {
      this.store.startGame()
      this.$router.push({ name: 'play' })
    }
  }
}
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>