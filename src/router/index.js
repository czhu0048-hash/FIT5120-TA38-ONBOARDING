import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ForYouView from '../views/ForYouView.vue'
import AwarenessView from '@/views/AwarenessView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/foryou',
        name: 'For You',
        component: ForYouView
    }, {
        path: '/awareness',
        name: 'Awareness',
        component: AwarenessView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router