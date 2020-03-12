import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        // alias: '/pcindex',
        name: 'pcindex',
        component: () => import('pa/home.vue'),
    },
    {
        path: '/usersetting',
        component: () => import('pa/home-config/staff-config.vue')
    },
    {
        path: '/adminsetting',
        component: () => import('pa/home-config/admin-staff-config.vue')
    },
    {
        path: '/home',
        component: () => import('pa/staff-home')
    }
]

const router = new VueRouter({
    routes,
    mode: 'history',
    base: "/pcindex/",
})

export default router
