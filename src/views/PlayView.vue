<template>
  <div class="play-view">

    <!-- Timer bar -->
    <div class="timer-bar">
      <div
        class="timer-fill"
        :style="{ width: timerPercent + '%' }"
        :class="{ urgent: store.timeLeft <= 5 }"
      />
    </div>

    <!-- Progress -->
    <p class="progress">
      Question {{ store.progress.current }} of {{ store.progress.total }}
    </p>

    <!-- Question -->
    <QuestionCard
      v-if="store.gameState === 'playing' && store.currentQuestion"
      :question="store.currentQuestion"
      :selectedAnswer="store.selectedAnswer"
      @answer="store.submitAnswer"
    />

    <!-- End screen -->
    <div v-if="store.gameState === 'end'">
  <h2>Game Over</h2>
  <p>You scored {{ store.score }} / {{ store.questions.length }}</p>

  <div v-if="store.token">
    <p>Playing as {{ store.userEmail }}</p>
    <button v-if="!store.scoreSubmitted" @click="store.submitScore()">
      Submit Score
    </button>
    <p v-else>Score submitted ✓</p>
  </div>

  <div v-else>
    <p>
      <RouterLink to="/login">Log in</RouterLink> to save your score to the leaderboard.
    </p>
  </div>

  <button @click="handleRestart">Play Again</button>
</div>

  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'
import QuestionCard from '../components/QuestionCard.vue'

export default {
  name: 'PlayView',
  components: { QuestionCard },

  setup() {
    const store = useGameStore()
    return { store }
  },

  computed: {
    timerPercent() {
      return (this.store.timeLeft / 15) * 100
    }
  },

  methods: {
    handleRestart() {
      this.store.resetGame()
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

.play-view {
  min-height: 100vh;
  background: #0f0f1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem 2rem;
}

/* ── Timer bar ── */
.timer-bar {
  width: 100%;
  max-width: 640px;
  height: 3px;
  background: #1e1e2e;
  border-radius: 999px;
  margin-bottom: 1.25rem;
  overflow: hidden;
}

.timer-fill {
  height: 100%;
  background: #5b6af5;
  transition: width 0.9s linear, background 0.3s ease;
  border-radius: 999px;
}

.timer-fill.urgent {
  background: #ef4444;
}

/* ── Progress ── */
.progress {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: #44445a;
  margin: 0 0 1.5rem;
  text-transform: uppercase;
}

/* ── End screen ── */
.end-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  max-width: 420px;
  margin-top: 3rem;
  text-align: center;
  font-family: 'DM Sans', sans-serif;
}

.end-title {
  font-size: 2rem;
  font-weight: 700;
  color: #e2e2f0;
  margin: 0;
}

.end-score {
  font-size: 1.1rem;
  color: #8888aa;
  margin: 0;
}

.score-highlight {
  color: #5b6af5;
  font-weight: 700;
}

/* ── Submit form ── */
.submit-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.name-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: #1a1a2e;
  border: 1px solid #2e2e4a;
  border-radius: 10px;
  color: #e2e2f0;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.name-input::placeholder {
  color: #44445a;
}

.name-input:focus {
  border-color: #5b6af5;
}

.submitted-msg {
  font-size: 1rem;
  color: #4ade80;
  font-weight: 500;
  margin: 0;
}

/* ── Buttons ── */
.btn {
  width: 100%;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
}

.btn:active {
  transform: scale(0.97);
}

.btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.btn-primary {
  background: #5b6af5;
  color: #fff;
}

.btn-primary:not(:disabled):hover {
  opacity: 0.88;
}

.btn-secondary {
  background: #1e1e38;
  color: #c0c0e0;
}

.btn-secondary:hover {
  background: #26263e;
}

.btn-ghost {
  background: transparent;
  color: #44445a;
  border: 1px solid #1e1e2e;
}

.btn-ghost:hover {
  color: #8888aa;
  border-color: #2e2e4a;
}

.end-actions {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
}
</style>