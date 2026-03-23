# Quiz 2 Answers
**Name:** Allison House
**Date:** 23 3 2026



## Q1

D


## Q2

```js
state: {
  // ...existing state
  lastAnswerCorrect: null,
},

actions: {
  submitAnswer(index) {
    const correct = index === this.questions[this.currentIndex].correct;
    this.lastAnswerCorrect = correct;
    if (correct) this.score++;
    this.nextQuestion();
  }
}
```
QuestionCard should read lastAnswerCorrect directly from the store rather than receive it as a prop from App.vue. If App.vue owned that value, it would have to do prop drilling. Letting QuestionCard access the store directly means that App.vue doesn't need to know lastAnswerCorrect exists.


## Q3

C

## Q4

Part A - The template never includes router-view. Without router-view, the router matches the route but has nowhere to render it, so the screen stays blank.

Part B - 
```js
<template>
  <div>
    <h1>QuizBlitz</h1>
    <router-view />
  </div>
</template>
```
Vue Router inspects the current URL, finds the matching route entry, and renders that route's component inside the router-view element. When the user navigates to /play, GameView replaces whatever was previously rendered there. 

## Q5

B

## Q6

After the last question, nextQuestion() sets currentIndex to state.questions.length, but state.questions[10] is undefined. undefined.text then throws a TypeError.
```js
getters: {
  currentQuestion: (state) =>
    state.questions[state.currentIndex] ?? null
}
```

The getter is the better location because it is the single point through which all components access currentQuestion. A guard here protects every consumer automatically, without requiring each component to defensively check for null. 

## Q7

B

## Q8

Local file approach

Advantage: this.questions is populated instantly, so gameState transitions to 'playing' with no loading delay.

Disadvantage: The question set is fixed at build time. 
Editing questions requires a code change and redeployment

Remote API approach

Advantage: Questions can be updated at any time without touching the code.

Disadvantage: startGame() now depends on network availability.

My choice and reasoning

At the current stage my priority is a working game. The local approach keeps startGame() simple and gameState transitions predictable. I would introduce the API fetch later, once a loading state and error handling are properly designed into the store.

## Q9

B

## Q10

useGameStore.js changes
```js
jsstate: () => ({
  // ...existing state
  timeLeft: 15,
}),

actions: {
  startGame() {
    this.questions = [...]; // existing logic
    this.currentIndex = 0;
    this.score = 0;
    this.gameState = 'playing';
    this.timeLeft = 15;
    this._startTimer();
  },

  _startTimer() {
    clearInterval(this._timerId);
    this._timerId = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this._timerId);
        this.nextQuestion();
      }
    }, 1000);
  },

  nextQuestion() {
    clearInterval(this._timerId);
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.timeLeft = 15;
      this._startTimer();
    } else {
      this.gameState = 'end';
    }
  },

  submitAnswer(index) {
    const correct = index === this.questions[this.currentIndex].correct;
    this.lastAnswerCorrect = correct;
    if (correct) this.score++;
    this.nextQuestion(); // nextQuestion clears the interval
  }
}
```
QuestionCard.vue changes
```js
<template>
  <div>
    <p class="timer" :class="{ urgent: store.timeLeft <= 5 }">
      ⏱ {{ store.timeLeft }}s
    </p>
    <!-- ...existing question and answer markup -->
  </div>
</template>
```
Why the timer logic belongs in the store, not the component

First, both QuestionCard and the game loop need to read and react to the same value. If the interval lived inside QuestionCard, only that component would know the clock had expired. Second, setInterval tied to a component is vulnerable to bugs. Keeping the interval inside _startTimer() gives the store full control over when it starts, resets, and stops. Third, placing timer logic in the store keeps QuestionCard a pure presentational component — it simply reads store.timeLeft and renders it.