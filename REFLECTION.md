Explain what a prop is and why we pass data down from the store via the parent rather than importing useGameStore directly 
inside QuestionCard.
  A 'prop' is a React keyword that stands for 'properties'. It's used for passing data from one component to another. 
  It's easier to pass data down from the store because props are unidirectional, meaning they're reusable.
Explain what $emit does, how the parent listens for it, and what would happen if you forgot to handle the emitted event in the parent.
  $emit passes data about events up from child to parent. The parent listens for it with a handler event that triggers when the child
  emits the specific event. If you forget to handle the emitted event, simply, nothing will happen. The child will emit but nothing 
  will trigger, and the parent's state will remain the same.
Explain what problem this causes as the component tree grows, and how moving state into a Pinia store solves it.
  As the component tree grows, more prop drilling becomes necessary, leading to unnecessarily long code. This can be fixed by having
  a Pinia store hold data rather than having each component own its own data. Now, instead of having to track down which component
  initializes and manages which data, you can find and pull it all from one place.
Explain the difference between a traditional multi-page website and a Single-Page Application. What does <router-view> do, 
and why does navigating between routes not reload the page?
  A traditional multi-page website reloads the page for every single action. <router-view> prevents this by changing the URL without
  making a whole new HTTP server request, which would cause the page to reload.
Explain the difference between v-if and v-show. Why is v-if the better choice here rather than v-show?
  v-if renders elements, while v-show toggles their 'display' property. This is the better choice for quizblitz because it keeps each
  question truly separate, ensuring no difficulty/mixups between questions and their answers.
