import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Nauci from '@/views/Nauci.vue'
import Proizvodi from '@/views/Proizvodi.vue'
import Korpa from '@/views/Korpa.vue'
import Kontakt from '@/views/Kontakt.vue'
import AboutUs from '@/views/AboutUs.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Admin_panel from "../views/Admin_panel";
// import AboutUs from '@/views/AboutUs.vue'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/admin_panel',
        name: 'admin_panel',
        component: Admin_panel
    },
    {
        path: '/aboutUs',
        name: 'aboutUs',
        component: AboutUs
    },
    {
        path: '/nauci',
        name: 'nauci',
        component: Nauci
    },
    {
        path: '/kontakt',
        name: 'kontakt',
        component: Kontakt
    },
    {
        path: '/korpa',
        name: 'korpa',
        component: Korpa
    },
    {
        path: '/proizvodi',
        name: 'proizvodi',
        component: Proizvodi
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
