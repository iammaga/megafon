import { createStore } from 'vuex';

const store = createStore({
    state: {
        isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' // Проверка состояния при загрузке
    },
    mutations: {
        login(state) {
            state.isAuthenticated = true;
            localStorage.setItem('isAuthenticated', 'true'); // Сохраняем статус в localStorage
        },
        logout(state) {
            state.isAuthenticated = false;
            localStorage.removeItem('isAuthenticated'); // Удаляем статус при выходе
        }
    },
    actions: {
        login({ commit }) {
            commit('login');
        },
        logout({ commit }) {
            commit('logout');
        }
    }
});

export default store;
