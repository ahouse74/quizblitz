<template>
  <div class="home-view">
    <main class="home-content">
      <h1 class="title">Trivia</h1>
      <p class="subtitle">10 questions. How well do you know your stuff?</p>

      <div class="actions">
        <button class="btn btn-primary" @click="startGame">Play</button>
        <button class="btn btn-ghost" @click="goLeaderboard">Leaderboard</button>
      </div>
    </main>
  </div>
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
    },

    goLeaderboard() {
      this.$router.push({ name: 'leaderboard' })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;800&family=DM+Sans:wght@400;500&display=swap');

.home-view {
  min-height: 100vh;
  background: #0f0f1a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.home-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(3rem, 10vw, 5.5rem);
  font-weight: 800;
  color: #e8e8f0;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
}

.subtitle {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  color: #55556a;
  margin: 0 0 2.5rem;
}

.actions {
  display: flex;
  gap: 0.75rem;
}

.btn {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.8rem 1.75rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.btn-primary {
  background: #5b6af5;
  color: #fff;
}

.btn-primary:hover {
  background: #6e7cf7;
}

.btn-ghost {
  background: transparent;
  border: 1.5px solid #22223a;
  color: #7777aa;
}

.btn-ghost:hover {
  border-color: #5b6af5;
  color: #c8c8e8;
}
</style>