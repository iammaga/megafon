import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Appeals from '../views/Appeals.vue'
import AppealDetail from '../views/AppealDetail.vue'
import CreateAppeal from '../views/CreateAppeal.vue'
import Users from '../views/Users.vue'
import UserEdit from '../views/UserEdit.vue'
import store from '../store'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { guest: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { guest: true }
    },
    {
        path: '/appeals',
        name: 'Appeals',
        component: Appeals,
        meta: { requiresAuth: true }
    },
    {
        path: '/appeals/create',
        name: 'CreateAppeal',
        component: CreateAppeal,
        meta: { requiresAuth: true }
    },
    {
        path: '/appeals/:id',
        name: 'AppealDetail',
        component: AppealDetail,
        meta: { requiresAuth: true }
    },
    {
        path: '/users',
        name: 'Users',
        component: Users,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/users/:id/edit',
        name: 'UserEdit',
        component: UserEdit,
        meta: { requiresAuth: true, requiresAdmin: true }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = store.state.user !== null
    const isAdmin = isLoggedIn && store.state.user.role === 'admin'

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLoggedIn) {
            next({ name: 'Login', query: { redirect: to.fullPath } })
        } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
            next({ name: 'Home' }) // Redirect to home if not admin
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.guest) && isLoggedIn) {
        next({ name: 'Home' })
    } else {
        next()
    }
})

export default router
