<template>
    <form @submit.prevent="login">
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
    </form>
</template>

<script>
import {ref} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export default {
    name: 'LoginForm',
    setup() {
        const store = useStore()
        const router = useRouter()
        const email = ref('')
        const password = ref('')

        const login = async () => {
            try {
                const response = await store.dispatch('login', {
                    email: email.value,
                    password: password.value
                })
                console.log('Login successful', response)
                router.push('/appeals')
            } catch (error) {
                console.error('Login failed', error)
                // Handle error (e.g., show error message)
            }
        }

        return {
            email,
            password,
            login
        }
    }
}
</script>
