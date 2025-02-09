import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state() {
        return {
            token: localStorage.getItem('token') || '',
            user: JSON.parse(localStorage.getItem('user')) || null,
        };
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout(state) {
            state.token = '';
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },
    actions: {
        async login({ commit }, credentials) {
            const response = await axios.post('/api/login', credentials);
            commit('setToken', response.data.access_token);
            commit('setUser', response.data.user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        },
        logout({ commit }) {
            commit('logout');
            delete axios.defaults.headers.common['Authorization'];
        }
    },
    getters: {
        isAuthenticated: state => !!state.token,
        getUser: state => state.user
    }
});

export default store;
