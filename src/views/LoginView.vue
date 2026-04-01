<template>
  <div class="auth-view">
    <div class="auth-card">
      <h1 class="title">Welcome back</h1>
      <p class="subtitle">Log in to save your scores</p>

      <div class="form">
        <div class="field">
          <label class="label">Email</label>
          <input
            v-model="email"
            type="email"
            class="input"
            placeholder="you@example.com"
            @keyup.enter="handleLogin"
          />
        </div>

        <div class="field">
          <label class="label">Password</label>
          <input
            v-model="password"
            type="password"
            class="input"
            placeholder="••••••••"
            @keyup.enter="handleLogin"
          />
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <button class="btn btn-primary" :disabled="loading" @click="handleLogin">
          {{ loading ? 'Logging in…' : 'Log in' }}
        </button>

        <p class="switch">
          Don't have an account?
          <RouterLink to="/register" class="switch-link">Register</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'

export default {
  name: 'LoginView',

  setup() {
    return { store: useGameStore() }
  },

  data() {
    return {
      email: '',
      password: '',
      error: null,
      loading: false,
    }
  },

  methods: {
    async handleLogin() {
      this.error = null
      this.loading = true
      try {
        await this.store.login(this.email, this.password)
        this.$router.push({ name: 'home' })
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;800&family=DM+Sans:wght@400;500&display=swap');

.auth-view {
  min-height: 100vh;
  background: #0f0f1a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.auth-card {
  width: 100%;
  max-width: 400px;
}

.title {
  font-family: 'Syne', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: #e8e8f0;
  margin: 0 0 0.4rem;
  letter-spacing: -0.02em;
}

.subtitle {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  color: #55556a;
  margin: 0 0 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.label {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: #7777aa;
  letter-spacing: 0.03em;
}

.input {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  color: #e8e8f0;
  background: #13131f;
  border: 1.5px solid #22223a;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  outline: none;
  transition: border-color 0.15s ease;
}

.input::placeholder {
  color: #33334a;
}

.input:focus {
  border-color: #5b6af5;
}

.error {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  color: #ef4444;
  margin: 0;
}

.btn {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.8rem 1.75rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;
  margin-top: 0.5rem;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #5b6af5;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background: #6e7cf7;
}

.switch {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  color: #55556a;
  text-align: center;
  margin: 0;
}

.switch-link {
  color: #5b6af5;
  text-decoration: none;
}

.switch-link:hover {
  color: #6e7cf7;
}
</style>