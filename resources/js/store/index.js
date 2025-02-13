import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        isAuthenticated: !!localStorage.getItem('authToken'),
        user: null,
        appeals: [],
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setAppeals(state, appeals) {
            state.appeals = appeals;
        },
        clearAppeals(state) {
            state.appeals = [];
        },
        setAuthentication(state, status) {
            state.isAuthenticated = status;
        },
    },
    actions: {
        async fetchUser({ commit }) {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:8000/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                commit('setUser', response.data);
            } catch (error) {
                console.error('Ошибка при получении данных о пользователе:', error);
            }
        },
        async logout({ commit }) {
            localStorage.removeItem('authToken');
            commit('setAuthentication', false);
            commit('setUser', null);
        },
    },
    getters: {
        isAdmin(state) {
            return state.user && state.user.role_id === 1;
        },
        isAuthenticated(state) {
            return state.isAuthenticated;
        },
    },
});

export default store;
