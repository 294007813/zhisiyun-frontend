import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home.vue')
    },
    {
        path: '/home-config',
        name: 'home',
        component: () => import('../views/home-config.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
