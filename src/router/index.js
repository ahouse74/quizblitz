import { createRouter, createWebHistory } from 'vue-router'
import { useGameStore } from '../stores/gameStore.js'
import HomeView from '../views/HomeView.vue'
import PlayView from '../views/PlayView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
    { path: '/', redirect: { name: 'login' } },
    { path: '/home', name: 'home', component: HomeView, meta: { requiresAuth: true } },
    { path: '/play', name: 'play', component: PlayView, meta: { requiresAuth: true } },
    { path: '/leaderboard', name: 'leaderboard', component: LeaderboardView, meta: { requiresAuth: true } },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to) => {
    const store = useGameStore()

    if (to.meta.requiresAuth && !store.isAuthenticated) {
        return { name: 'login', query: { redirect: to.fullPath } }
    }

    if ((to.name === 'login' || to.name === 'register') && store.isAuthenticated) {
        return { name: 'home' }
    }

    if (to.name === 'play' && store.gameState !== 'playing') {
        return { name: 'home' }
    }
})

export default router