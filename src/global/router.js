import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('pa/home.vue')
    },
    {
        path: '/staff-config',
        component: () => import('pa/home-config/staff-config.vue')
    },
    {
        path: '/admin-staff-config',
        component: () => import('pa/home-config/admin-staff-config.vue')
    },
    {
        path: '/staff-home',
        component: () => import('pa/staff-home')
    }
]

const router = new VueRouter({
    routes,
    // mode: 'history'
})

export default router
