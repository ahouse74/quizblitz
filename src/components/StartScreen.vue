<template>
  <div class="start-screen">
    <h1>QuizBlitz</h1>
    <p class="tagline">Test your speed. Master the facts.</p>
    <button @click="handleStartClick">Play</button>
  </div>
</template>

<script>
export default {
  name: 'StartScreen',
  // Defining emitted events for clarity and documentation
  emits: ['start'],
  methods: {
    handleStartClick() {
      // Emits the 'start' event to the parent component
      this.$emit('start');
    }
  }
}
</script>

<style scoped>
.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  font-family: sans-serif;
}

h1 {
  font-size: 3rem;
  color: #42b883; /* Vue green */
  margin-bottom: 0.5rem;
}

.tagline {
  font-size: 1.2rem;
  color: #35495e;
  margin-bottom: 2rem;
}

button {
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.1s ease;
}

button:hover {
  background-color: #3aa876;
}

button:active {
  transform: scale(0.95);
}
</style>
