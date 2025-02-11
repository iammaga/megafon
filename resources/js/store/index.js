import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        isAuthenticated: !!localStorage.getItem('authToken'),
        appeals: [],
    },
    mutations: {
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
        async searchAppeals({ commit }, query) {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`http://localhost:8000/api/appeals/search?query=${query}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                commit('setAppeals', response.data.data);
            } catch (error) {
                console.error('Ошибка при поиске обращений:', error);
            }
        },
        clearAppeals({ commit }) {
            commit('clearAppeals');
        },
        logout({ commit }) {
            // Удаляем токен из localStorage
            localStorage.removeItem('authToken');
            commit('setAuthentication', false);  // Обновляем статус аутентификации
        },
    },
});

export default store;
