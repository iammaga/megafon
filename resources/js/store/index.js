import {createStore} from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        user: null,
        appeals: [],
        users: []
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        SET_APPEALS(state, appeals) {
            state.appeals = appeals
        },
        SET_USERS(state, users) {
            state.users = users
        }
    },
    actions: {
        async register({commit}, userData) {
            try {
                const response = await axios.post('/api/register', userData)
                return response.data
            } catch (error) {
                console.error('Registration failed', error)
                throw error
            }
        },
        async login({commit}, credentials) {
            try {
                const response = await axios.post('/api/login', credentials)
                commit('SET_USER', response.data.user)
                return response.data
            } catch (error) {
                console.error('Login failed', error)
                throw error
            }
        },
        async logout({commit}) {
            try {
                await axios.post('/api/logout')
                commit('SET_USER', null)
            } catch (error) {
                console.error('Logout failed', error)
                throw error
            }
        },
        async fetchAppeals({commit}) {
            try {
                const response = await axios.get('/api/appeals')
                commit('SET_APPEALS', response.data)
            } catch (error) {
                console.error('Failed to fetch appeals', error)
                throw error
            }
        },
        async searchAppeals({commit}, query) {
            try {
                const response = await axios.get(`/api/appeals/search?query=${query}`)
                commit('SET_APPEALS', response.data)
            } catch (error) {
                console.error('Failed to search appeals', error)
                throw error
            }
        },
        async createAppeal({dispatch}, appealData) {
            try {
                await axios.post('/api/appeals', appealData)
                dispatch('fetchAppeals')
            } catch (error) {
                console.error('Failed to create appeal', error)
                throw error
            }
        },
        async fetchUsers({commit}) {
            try {
                const response = await axios.get('/api/users')
                commit('SET_USERS', response.data)
            } catch (error) {
                console.error('Failed to fetch users', error)
                throw error
            }
        }
    },
    modules: {}
})
