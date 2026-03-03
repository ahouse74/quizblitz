<template>
  <div class="score-board">
    <h1>Game Over</h1>
    <p class="final-score">You scored: <strong>{{ score }}</strong> / 10</p>
    
    <button @click="onRestart">Play Again</button>
  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',
  props: {
    // Receiving the score from the parent component
    score: {
      type: Number,
      required: true,
      default: 0
    }
  },
  emits: ['restart'],
  methods: {
    onRestart() {
      // Notify parent to reset the game state
      this.$emit('restart');
    }
  }
}
</script>

<style scoped>
.score-board {
  text-align: center;
  padding: 3rem;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #e74c3c; /* A distinct 'Game Over' red */
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.final-score {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  background-color: #35495e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #42b883;
}
</style>
