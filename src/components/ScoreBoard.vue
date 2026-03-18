<template>
  <div class="score-board">
    <p class="label">Your score</p>
    <p class="score">{{ score }}<span class="total"> / {{ total }}</span></p>

    <div class="actions">
      <button class="btn btn-primary" @click="$emit('restart')">Play Again</button>
      <button class="btn btn-ghost" @click="$emit('home')">Home</button>
      <button class="btn btn-ghost" @click="$emit('leaderboard')">Leaderboard</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',

  props: {
    score: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      default: 10
    }
  },

  emits: ['restart', 'home', 'leaderboard'],
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;800&family=DM+Sans:wght@400;500&display=swap');

.score-board {
  font-family: 'DM Sans', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0;
}

.label {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #55556a;
  margin: 0 0 0.6rem;
}

.score {
  font-family: 'Syne', sans-serif;
  font-size: clamp(4rem, 12vw, 6.5rem);
  font-weight: 800;
  color: #e8e8f0;
  line-height: 1;
  margin: 0 0 2.5rem;
  letter-spacing: -0.02em;
}

.total {
  font-size: 0.45em;
  color: #44445a;
}

.actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
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