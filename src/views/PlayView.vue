<template>
  <div class="play-view">
    <QuestionCard
      v-if="gameState === 'playing' && currentQuestion"
      :question="currentQuestion"
      @answer="handleAnswer"
    />

    <ScoreBoard
      v-else-if="gameState === 'end'"
      :score="score"
      @restart="startGame"
    />
  </div>
</template>

<script>
import QuestionCard from '../components/QuestionCard.vue'
import ScoreBoard from '../components/ScoreBoard.vue'

export default {
  name: 'PlayView',

  components: {
    QuestionCard,
    ScoreBoard
  },

  data() {
    return {
      questions: [
        {
          question: 'What is the capital of France?',
          answers: ['Berlin', 'Madrid', 'Paris', 'Rome'],
          correct: 2
        },
        {
          question: 'Which planet is known as the Red Planet?',
          answers: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
          correct: 1
        },
        {
          question: 'Who wrote "To Kill a Mockingbird"?',
          answers: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway', 'F. Scott Fitzgerald'],
          correct: 0
        },
        {
          question: 'What is the largest ocean on Earth?',
          answers: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
          correct: 3
        },
        {
          question: 'What is the chemical symbol for gold?',
          answers: ['Au', 'Ag', 'Fe', 'Pb'],
          correct: 0
        },
        {
            question: 'Which country is known as the Land of the Rising Sun?',
            answers: ['China', 'Japan', 'South Korea', 'Thailand'],
            correct: 1
        },
        {
            question: 'What is the smallest prime number?',
            answers: ['0', '1', '2', '3'],
            correct: 2
        },
        {
            question: 'Who painted the Mona Lisa?',
            answers: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
            correct: 2
        },
        {
            question: 'What is the largest mammal?',
            answers: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
            correct: 1
        },
        {
            question: 'Which element has the atomic number 1?',
            answers: ['Oxygen', 'Hydrogen', 'Carbon', 'Nitrogen'],
            correct: 1
        }
      ],
      currentIndex: 0,
      score: 0,
      gameState: 'playing' // 'playing' | 'end'
    }
  },

  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex] ?? null
    }
  },

  mounted() {
    this.startGame()
  },

  methods: {
  startGame() {
    this.currentIndex = 0
    this.score = 0
    this.gameState = 'playing'
  },

  resetGame() {
    this.currentIndex = 0
    this.score = 0
    this.gameState = 'playing'
  },

  handleAnswer(isCorrect) {
    if (isCorrect) {
      this.score++
    }

    const isLastQuestion = this.currentIndex >= this.questions.length - 1

    if (isLastQuestion) {
      this.gameState = 'end'
    } else {
      this.currentIndex++
    }
  }
}
}
</script>

<style scoped>
.play-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
</style>