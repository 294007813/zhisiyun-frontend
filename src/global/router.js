import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../pages/home.vue')
    },
    {
        path: '/staff-config',
        component: () => import('../pages/home-config/staff-config.vue')
    },
    {
        path: '/admin-staff-config',
        component: () => import('../pages/home-config/admin-staff-config.vue')
    },
    {
        path: '/staff-home',
        component: () => import('@/pages/staff-home')
    }
]

const router = new VueRouter({
    routes
})

export default router
