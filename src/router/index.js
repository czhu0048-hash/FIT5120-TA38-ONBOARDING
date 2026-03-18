import { createRouter, createWebHistory } from 'vue-router'
import ForYouView from '../views/ForYouView.vue'
import AwarenessView from '@/views/AwarenessView.vue'
import AwarenessViewOne from '@/views/AwarenessViewOne.vue'
import DashboardView from '../views/DashboardView.vue'
import WelcomeView from '@/views/WelcomeView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: WelcomeView
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardView
    },
    {
        path: '/foryou',
        name: 'For You',
        component: ForYouView
    }, {
        path: '/awareness',
        name: 'Awareness',
        component: AwarenessView
    }, {
        path: '/awarenessOne',
        name: 'AwarenessOne',
        component: AwarenessViewOne
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router