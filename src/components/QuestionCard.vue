<template>
  <div class="question-card">
    <div class="question-text">
      <span class="question-label">Question</span>
      <p>{{ question.question }}</p>
    </div>

    <div class="answers-grid">
      <button
        v-for="(answer, index) in question.answers"
        :key="index"
        class="answer-btn"
        :class="{
          correct: highlightCorrect && index === question.correct,
          wrong: highlightWrong === index,
          disabled: isDisabled,
        }"
        :disabled="isDisabled"
        @click="handleAnswer(index)"
      >
        <span class="answer-letter">{{ letters[index] }}</span>
        <span class="answer-text">{{ answer }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionCard',

  props: {
    question: {
      type: Object,
      required: true,
      // Shape: { question: String, answers: Array, correct: Number }
    },
  },

  emits: ['answer'],

  data() {
    return {
      isDisabled: false,
      highlightCorrect: false,
      highlightWrong: null,
      letters: ['A', 'B', 'C', 'D'],
    }
  },

  methods: {
    handleAnswer(index) {
      if (this.isDisabled) return

      const isCorrect = index === this.question.correct

      this.isDisabled = true          // lock all buttons immediately
      this.highlightCorrect = true    // always reveal the correct answer

      if (!isCorrect) {
        this.highlightWrong = index   // also flag the wrong pick in red
      }

      setTimeout(() => {
        this.$emit('answer', isCorrect)
        this.resetState()
      }, 1000)
    },

    resetState() {
      this.isDisabled = false
      this.highlightCorrect = false
      this.highlightWrong = null
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;800&family=DM+Sans:wght@400;500&display=swap');

.question-card {
  font-family: 'DM Sans', sans-serif;
  background: #0f0f1a;
  border: 1px solid #2a2a3d;
  border-radius: 20px;
  padding: 2.5rem;
  max-width: 640px;
  margin: 0 auto;
  box-shadow: 0 0 60px rgba(99, 60, 255, 0.08);
}

.question-text { margin-bottom: 2rem; }

.question-label {
  font-family: 'Syne', sans-serif;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #6340ff;
  display: block;
  margin-bottom: 0.75rem;
}

.question-text p {
  font-family: 'Syne', sans-serif;
  font-size: 1.35rem;
  font-weight: 600;
  color: #e8e8f0;
  margin: 0;
  line-height: 1.5;
}

.answers-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

.answer-btn {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: #1a1a2e;
  border: 1.5px solid #2a2a3d;
  border-radius: 12px;
  padding: 0.9rem 1.1rem;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
  color: #c8c8da;
}

.answer-btn:hover:not(.disabled) {
  background: #22224a;
  border-color: #6340ff;
  transform: translateY(-2px);
}

.answer-letter {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 0.8rem;
  background: #2a2a3d;
  color: #8888aa;
  border-radius: 6px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s;
}

.answer-text {
  font-size: 0.92rem;
  font-weight: 500;
  line-height: 1.35;
}

.answer-btn.disabled { cursor: not-allowed; opacity: 0.6; }

/* correct answer always glows green */
.answer-btn.correct {
  background: #0d2b1a;
  border-color: #22c55e;
  color: #86efac;
  opacity: 1;
}
.answer-btn.correct .answer-letter { background: #22c55e; color: #fff; }

/* wrong pick glows red */
.answer-btn.wrong {
  background: #2b0d0d;
  border-color: #ef4444;
  color: #fca5a5;
  opacity: 1;
}
.answer-btn.wrong .answer-letter { background: #ef4444; color: #fff; }
</style>