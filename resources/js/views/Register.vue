<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-2xl shadow-xl w-96">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
            <form @submit.prevent="register">
                <div class="mb-4">
                    <label class="block text-gray-700">Name</label>
                    <input v-model="name" type="text" class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Email</label>
                    <input v-model="email" type="email" class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Password</label>
                    <input v-model="password" type="password" class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                </div>
                <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Register</button>
            </form>
            <p class="mt-4 text-center text-gray-600">
                Already have an account?
                <router-link to="/login" class="text-blue-500 hover:underline">Login</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: ''
        };
    },
    methods: {
        ...mapActions(['register']),
        async register() {
            try {
                await this.register({name: this.name, email: this.email, password: this.password});
                this.$router.push('/'); // Перенаправление на главную после регистрации
            } catch (error) {
                console.error('Registration error:', error);
            }
        }
    }
};
</script>

<style scoped>
body {
    font-family: 'Poppins', sans-serif;
}
</style>
