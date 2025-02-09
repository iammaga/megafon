<template>
    <div class="min-h-screen flex items-center justify-center bg-white">
        <div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md border border-green-500">
            <div class="px-6 py-4">
                <div class="flex justify-center mx-auto">
                    <img class="w-auto h-7 sm:h-8"
                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/MegaFon_logo_without_text.svg/2048px-MegaFon_logo_without_text.svg.png"
                         alt="Logo">
                </div>

                <h3 class="mt-3 text-xl font-medium text-center text-gray-800">Create an Account</h3>

                <!-- Сообщение об успехе или ошибке -->
                <div v-if="message" :class="{'text-green-600': isSuccess, 'text-red-600': !isSuccess}"
                     class="mt-4 text-center">
                    <p>{{ message }}</p>
                </div>

                <form @submit.prevent="register">
                    <div class="w-full mt-4">
                        <input
                            v-model="name"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border
                                   border-green-500 rounded-lg focus:border-green-600 focus:ring-2
                                   focus:ring-green-400 focus:outline-none"
                            type="text"
                            placeholder="Name"
                            aria-label="Name"
                            required
                        />
                    </div>

                    <div class="w-full mt-4">
                        <input
                            v-model="email"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border
                                   border-green-500 rounded-lg focus:border-green-600 focus:ring-2
                                   focus:ring-green-400 focus:outline-none"
                            type="email"
                            placeholder="Email Address"
                            aria-label="Email Address"
                            required
                        />
                    </div>

                    <div class="w-full mt-4">
                        <input
                            v-model="password"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border
                                   border-green-500 rounded-lg focus:border-green-600 focus:ring-2
                                   focus:ring-green-400 focus:outline-none"
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            required
                        />
                    </div>

                    <div class="w-full mt-4">
                        <select v-model="role"
                                class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border
                                   border-green-500 rounded-lg focus:border-green-600 focus:ring-2
                                   focus:ring-green-400 focus:outline-none"
                                required>
                            <option value="admin">Admin</option>
                            <option value="operator">Operator</option>
                            <option value="back_office">Back Office</option>
                        </select>
                    </div>

                    <div class="flex items-center justify-between mt-4">
                        <button
                            type="submit"
                                class="w-full px-6 py-2 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors
                                       duration-300 transform bg-green-500 rounded-lg hover:bg-green-600
                                       focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>

            <div class="flex items-center justify-center py-4 text-center bg-gray-50 border-t border-green-500">
                <span class="text-sm text-gray-600">Already have an account?</span>
                <a href="#" @click.prevent="toggleForm" class="mx-2 text-sm font-bold text-green-500 hover:underline">Login</a>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: 'RegisterForm',
    setup() {
        const store = useStore();
        const router = useRouter();
        const name = ref('');
        const email = ref('');
        const password = ref('');
        const role = ref('admin');
        const message = ref('');
        const isSuccess = ref(false);

        const register = async () => {
            try {
                const response = await store.dispatch('register', {
                    name: name.value,
                    email: email.value,
                    password: password.value,
                    role: role.value
                });

                isSuccess.value = true;
                message.value = 'User successfully registered!';
                localStorage.setItem('token', response.data.access_token); // Save token in localStorage
                router.push('/appeals');
            } catch (error) {
                isSuccess.value = false;
                message.value = error.response?.data?.message || 'Registration failed.';
            }
        };

        const toggleForm = () => {
            router.push('/');
        };

        return { name, email, password, role, message, isSuccess, register, toggleForm };
    }
};
</script>
