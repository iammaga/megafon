<template>
    <form @submit.prevent="register">
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" required>
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
        </div>
        <div>
            <label for="role">Role:</label>
            <select id="role" v-model="role" required>
                <option value="operator">Operator</option>
                <option value="back_office">Back Office</option>
            </select>
        </div>
        <button type="submit">Register</button>
    </form>
</template>

<script>
import {ref} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export default {
    name: 'RegisterForm',
    setup() {
        const store = useStore()
        const router = useRouter()
        const name = ref('')
        const email = ref('')
        const password = ref('')
        const role = ref('operator')

        const register = async () => {
            try {
                const response = await store.dispatch('register', {
                    name: name.value,
                    email: email.value,
                    password: password.value,
                    role: role.value
                })
                console.log('Registration successful', response)
                router.push('/login')
            } catch (error) {
                console.error('Registration failed', error)
                // Handle error (e.g., show error message)
            }
        }

        return {
            name,
            email,
            password,
            role,
            register
        }
    }
}
</script>
