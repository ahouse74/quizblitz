<template>
  <div class="leaderboard">
    <h1>Leaderboard</h1>

    <p v-if="loading">Loading scores...</p>

    <p v-else-if="error">Could not load scores. Is the server running?</p>

    <ol v-else-if="scores.length > 0">
      <li v-for="entry in scores" :key="entry._id">
        <span class="name">{{ entry.playerName }}</span>
        <span class="score">{{ entry.score }} / {{ entry.totalQuestions }}</span>
      </li>
    </ol>

    <p v-else>No scores yet. Be the first to play!</p>

    <RouterLink to="/">← Back to home</RouterLink>
  </div>
</template>

<script>
export default {
  name: 'LeaderboardView',
  data() {
    return {
      scores: [],
      loading: true,
      error: false
    }
  },
  async mounted() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/scores`)
      if (!response.ok) throw new Error('Server error')
      this.scores = await response.json()
    } catch (err) {
      this.error = true
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

.leaderboard {
  min-height: 100vh;
  padding: 6rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #0f0f1a;
  color: #e8e8f0;
}

.leaderboard h1 {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  margin: 0 0 1rem;
}

.leaderboard .card {
  width: 100%;
  max-width: 680px;
  background: rgba(15, 15, 26, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.35);
}

.leaderboard p {
  font-family: 'DM Sans', sans-serif;
  color: #9ca3af;
  margin: 0 0 1rem;
}

.leaderboard ol {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.85rem;
}

.leaderboard li {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
}

.leaderboard .name {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.98rem;
  color: #f8fafc;
}

.leaderboard .score {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  color: #a5b4fc;
  text-align: right;
}

.leaderboard a {
  display: inline-block;
  margin-top: 1.5rem;
  font-family: 'DM Sans', sans-serif;
  color: #7c3aed;
  text-decoration: none;
}

.leaderboard a:hover {
  text-decoration: underline;
}
</style>