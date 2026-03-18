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

    <!-- Score screen -->
    <ScoreBoard
      v-else-if="store.gameState === 'end'"
      :score="store.score"
      :total="store.questions.length"
      @restart="handleRestart"
      @home="$router.push({ name: 'home' })"
      @leaderboard="$router.push({ name: 'leaderboard' })"
    />

  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'
import QuestionCard from '../components/QuestionCard.vue'
import ScoreBoard from '../components/ScoreBoard.vue'

export default {
  name: 'PlayView',
  components: { QuestionCard, ScoreBoard },

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
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');

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
</style>