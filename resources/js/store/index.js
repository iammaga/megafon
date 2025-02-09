import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        user: null,
        token: localStorage.getItem('token') || ''
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        logout(state) {
            state.user = null;
            state.token = '';
            localStorage.removeItem('token');
        }
    },
    actions: {
        async register({ commit }, { name, email, password, role }) {
            const response = await axios.post('http://localhost:8000/api/register', {
                name,
                email,
                password,
                role
            });
            commit('setToken', response.data.access_token);
            commit('setUser', response.data.user);
            return response;
        },
        async login({ commit }, { email, password }) {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            commit('setToken', response.data.access_token);
            commit('setUser', response.data.user);
            return response;
        },
        logout({ commit }) {
            commit('logout');
        }
    },
    getters: {
        getUser: state => state.user,
        getToken: state => state.token
    }
});
