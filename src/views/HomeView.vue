<template>
  <div class="home-view">
    <StartScreen @start="handleStart" />
  </div>
</template>

<script>
import StartScreen from '../components/StartScreen.vue'

export default {
  name: 'HomeView',

  components: {
    StartScreen
  },

  methods: {
    handleStart() {
      sessionStorage.setItem('gameStarted', 'true')
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