<template>
  <div id="app">
    <nav class="nav">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/leaderboard" class="nav-link">Leaderboard</RouterLink>
      <template v-if="store.token">
        <button class="nav-link nav-btn" @click="handleLogout">Log out</button>
      </template>
      <template v-else>
        <RouterLink to="/login" class="nav-link">Log in</RouterLink>
        <RouterLink to="/register" class="nav-link">Register</RouterLink>
      </template>
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
  },

  methods: {
    handleLogout() {
      this.store.logout()
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #0f0f1a;
}

#app {
  min-height: 100vh;
}

/* ── Nav ── */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
}

.nav-link {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #7777aa;
  background: transparent;
  border: 1.5px solid #22223a;
  border-radius: 8px;
  padding: 0.45rem 1rem;
  text-decoration: none;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  border-color: #5b6af5;
  color: #c8c8e8;
}

.nav-btn {
  cursor: pointer;
}
</style>