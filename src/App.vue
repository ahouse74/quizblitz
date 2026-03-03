<template>
  <div id="app">
    <StartScreen v-if="gameState === 'start'" @start="startGame" />
    <QuestionCard
      v-else-if="gameState === 'playing'"
      :question="questions[currentIndex]"
      @answer="handleAnswer"
    />
    <ScoreBoard
      v-else
      :score="score"
      @restart="resetGame"
    />
  </div>
</template>

<script>
import QuestionCard from './components/QuestionCard.vue'
import StartScreen from './components/StartScreen.vue'
import ScoreBoard from './components/ScoreBoard.vue'

export default {
  name: 'App',

  components: { QuestionCard, StartScreen, ScoreBoard },

  data() {
  return {
    questions: [
    {
      question: "What is the capital of France?",
      answers: ["Berlin", "Madrid", "Paris", "Rome"],
      correct: 2
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: 1
    },
    {
      question: "What is the largest ocean on Earth?",
      answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correct: 3
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      answers: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
      correct: 0
    },
    {
      question: "What is the chemical symbol for gold?",
      answers: ["Au", "Ag", "Fe", "Pb"],
      correct: 0
    },
    {
      question: "Which country hosted the 2016 Summer Olympics?",
      answers: ["China", "Brazil", "United Kingdom", "Russia"],
      correct: 1
    },
    {
      question: "What is the smallest prime number?",
      answers: ["0", "1", "2", "3"],
      correct: 2
    },
    {
      question: "Who painted the Mona Lisa?",
      answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
      correct: 2
    },
    {
      question: "What is the largest mammal in the world?",
      answers: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correct: 1
    },
    {
      question: "Which language is primarily spoken in Brazil?",
      answers: ["Spanish", "Portuguese", "French", "English"],
      correct: 1
    }
    ], // you will fill this with your 10 questions
    currentIndex: 0,
    score: 0,
    gameState: "start" // "start" | "playing" | "end"
  }
},

  methods: {
    startGame() {
      this.currentIndex = 0
      this.score = 0
      this.gameState = 'playing'
    },

    handleAnswer(isCorrect) {
      if (isCorrect) this.score++
      this.currentIndex++

      if (this.currentIndex === this.questions.length) {
        this.gameState = 'end'
      }
    },

    resetGame() {
      this.gameState = 'start'
    },
  },
}
</script>