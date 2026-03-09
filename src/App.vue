<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/leaderboard">Leaderboard</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script>
import { useGameStore } from './stores/gameStore.js'

export default {
  name: 'App',
  setup() {
    const store = useGameStore()
    return { store }
  }
}
</script>