<template>
    <div class="min-h-screen flex items-center justify-center bg-white">
        <div class="w-full max-w-sm mx-auto bg-white rounded-lg shadow-md border border-green-500">
            <div class="px-6 py-4">
                <div class="flex justify-center mx-auto">
                    <img
                        class="w-auto h-7 sm:h-8"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/MegaFon_logo_without_text.svg/2048px-MegaFon_logo_without_text.svg.png"
                        alt="Logo"
                    />
                </div>

                <h3 class="mt-3 text-xl font-medium text-center text-gray-800">Welcome Back</h3>
                <p class="mt-1 text-center text-gray-500">Login or create account</p>

                <!-- Сообщение об успехе или ошибке -->
                <div v-if="message"
                     :class="{'text-green-600': isSuccess, 'text-red-600': !isSuccess}"
                     class="mt-4 text-center">
                    <p>{{ message }}</p>
                </div>

                <form @submit.prevent="login" class="mt-4">
                    <div>
                        <input
                            v-model="email"
                            type="email"
                            placeholder="Email Address"
                            aria-label="Email Address"
                            required
                            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-green-500 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
                        />
                    </div>

                    <div class="mt-4">
                        <input
                            v-model="password"
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            required
                            class="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border border-green-500 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
                        />
                    </div>

                    <div class="flex items-center justify-between mt-4">
                        <a href="#" class="text-sm text-gray-600 hover:text-green-600">Forgot Password?</a>

                        <button
                            type="submit"
                            class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>

            <div class="flex items-center justify-center py-4 bg-gray-50 border-t border-green-500">
                <span class="text-sm text-gray-600">Don't have an account?</span>
                <a href="#" class="mx-2 text-sm font-bold text-green-500 hover:underline">Register</a>
            </div>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default {
    name: 'LoginForm',
    setup() {
        const store = useStore();
        const router = useRouter();
        const email = ref('');
        const password = ref('');
        const message = ref('');
        const isSuccess = ref(false);

        const login = async () => {
            try {
                await store.dispatch('login', {email: email.value, password: password.value});
                isSuccess.value = true;
                message.value = 'Успешная авторизация!';
                router.push('/appeals'); // Перенаправление после успешного входа
            } catch (error) {
                isSuccess.value = false;
                message.value = error.response?.data?.message || 'Ошибка авторизации. Проверьте логин и пароль.';
            }
        };

        return {email, password, message, isSuccess, login};
    }
};
</script>

<style scoped>
.message {
    transition: opacity 0.5s ease;
}
</style>
