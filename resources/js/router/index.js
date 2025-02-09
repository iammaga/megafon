import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Appeals from '../views/Appeals.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/appeals',
        name: 'Appeals',
        component: Appeals
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
