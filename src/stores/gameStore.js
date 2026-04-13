import { defineStore } from 'pinia'
import { questions as questionBank } from '../data/questions.js'

export const useGameStore = defineStore('game', {

    state: () => ({
        questions: [],
        currentIndex: 0,
        score: 0,
        gameState: 'start',
        selectedAnswer: null,
        timeLeft: 15,
        _timerInterval: null,
        playerName: '',
        scoreSubmitted: false,
        token: localStorage.getItem('quizblitz_token') || null,
        userEmail: localStorage.getItem('quizblitz_email') || null
    }),

    getters: {
        currentQuestion: (state) => state.questions[state.currentIndex],
        isLastQuestion: (state) => state.currentIndex >= state.questions.length - 1,
        progress: (state) => ({
            current: state.currentIndex + 1,
            total: state.questions.length
        }),
        isAuthenticated: (state) => Boolean(state.token)
    },

    actions: {
        _startTimer() {
            this._stopTimer()
            this._timerInterval = setInterval(() => {
                this.tick()
            }, 1000)
        },

        _stopTimer() {
            if (this._timerInterval) {
                clearInterval(this._timerInterval)
                this._timerInterval = null
            }
        },

        tick() {
            if (this.timeLeft > 0) {
                this.timeLeft--
            } else {
                this.nextQuestion()
            }
        },

        async startGame() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/questions/random`)
            const questions = await response.json()
            this.questions = questions
            this.currentIndex = 0
            this.score = 0
            this.gameState = 'playing'
            this.selectedAnswer = null
            this.timeLeft = 15
            this._startTimer()
        },

        submitAnswer(answerIndex) {
            if (this.selectedAnswer !== null) return
            this._stopTimer()
            this.selectedAnswer = answerIndex
            const isCorrect = answerIndex === this.currentQuestion.correct
            if (isCorrect) this.score++
            setTimeout(() => {
                this.nextQuestion()
            }, 1000)
        },

        nextQuestion() {
            this.selectedAnswer = null
            this.timeLeft = 15
            if (this.isLastQuestion) {
                this._stopTimer()
                this.gameState = 'end'
            } else {
                this.currentIndex++
                this._startTimer()
            }
        },

        async submitScore() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/scores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    score: this.score,
                    totalQuestions: this.questions.length
                })
            })
            if (response.ok) {
                this.scoreSubmitted = true
            }
        },

        resetGame() {
            this._stopTimer()
            this.questions = []
            this.currentIndex = 0
            this.score = 0
            this.gameState = 'start'
            this.selectedAnswer = null
            this.timeLeft = 15
            this.playerName = ''
            this.scoreSubmitted = false
        },
        async register(email, password) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error)
            return data
        },

        async login(email, password) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error)
            this.token = data.token
            this.userEmail = data.email
            localStorage.setItem('quizblitz_token', data.token)
            localStorage.setItem('quizblitz_email', data.email)
            return data
        },

        logout() {
            this.token = null
            this.userEmail = null
            localStorage.removeItem('quizblitz_token')
            localStorage.removeItem('quizblitz_email')
        }
    }
})