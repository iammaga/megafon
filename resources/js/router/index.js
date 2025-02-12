import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import LoginForm from "../components/LoginForm.vue";
import Register from '../views/Register.vue';
import Appeals from '../components/Appeals.vue';
import Users from "../components/Users.vue";

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'LoginForm', component: LoginForm },
    { path: '/register', name: 'Register', component: Register },
    {
        path: '/appeals',
        name: 'Appeals',
        component: Appeals,
        meta: { requiresAuth: true }
    },
    { path: '/users', name: 'Users', component: Users, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('authToken');

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
        next('/appeals');
    } else {
        next();
    }
});

export default router;
