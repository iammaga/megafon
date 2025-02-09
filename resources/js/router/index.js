import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Appeals from '../views/Appeals.vue';
import store from '../store';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/appeals', name: 'Appeals', component: Appeals, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isAuthenticated) {
            next('/');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
