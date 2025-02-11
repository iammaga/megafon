import { createStore } from 'vuex';

const store = createStore({
    state: {
        isAuthenticated: !!localStorage.getItem('authToken') // Проверка наличия токена при старте
    },
    mutations: {
        login(state, token) {
            state.isAuthenticated = true;
            localStorage.setItem('authToken', token); // Сохраняем токен
        },
        logout(state) {
            state.isAuthenticated = false;
            localStorage.removeItem('authToken'); // Удаляем токен при выходе
        }
    },
    actions: {
        login({ commit }, token) {
            commit('login', token);
        },
        logout({ commit }) {
            commit('logout');
        }
    }
});

export default store;
