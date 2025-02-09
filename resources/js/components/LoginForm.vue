<template>
    <div class="min-h-screen flex items-center justify-center bg-white">
        <div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md border border-green-500">
            <div class="px-6 py-4">
                <div class="flex justify-center mx-auto">
                    <img class="w-auto h-7 sm:h-8"
                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/MegaFon_logo_without_text.svg/2048px-MegaFon_logo_without_text.svg.png"
                         alt="Logo">
                </div>

                <h3 class="mt-3 text-xl font-medium text-center text-gray-800">
                    {{ isLogin ? 'Welcome Back' : 'Create an Account' }}
                </h3>
                <p class="mt-1 text-center text-gray-500">
                    {{ isLogin ? 'Login to your account' : 'Create a new account' }}
                </p>

                <!-- Сообщение об успехе или ошибке -->
                <div v-if="message" :class="{'text-green-600': isSuccess, 'text-red-600': !isSuccess}"
                     class="mt-4 text-center">
                    <p>{{ message }}</p>
                </div>

                <!-- Форма логина -->
                <form v-if="isLogin" @submit.prevent="login">
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

                    <div class="flex items-center justify-between mt-4">
                        <!--                        <a href="#" class="text-sm text-gray-600 hover:text-green-600">Forgot Password?</a>-->

                        <button
                            type="submit"
                            class="w-full px-6 py-2 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors
                                   duration-300 transform bg-green-500 rounded-lg hover:bg-green-600
                                   focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                <!-- Форма регистрации -->
                <form v-if="!isLogin" @submit.prevent="register">
                    <div class="w-full mt-4">
                        <input
                            v-model="name"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border
                                   border-green-500 rounded-lg focus:border-green-600 focus:ring-2
                                   focus:ring-green-400 focus:outline-none"
                            type="text"
                            placeholder="Name"
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
                            required
                        />
                    </div>

                    <div class="flex items-center justify-between mt-4">
                        <button
                            class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors
                                   duration-300 transform bg-green-500 rounded-lg hover:bg-green-600
                                   focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>

            <div class="flex items-center justify-center py-4 text-center bg-gray-50 border-t border-green-500">
                <span class="text-sm text-gray-600">
                    {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
                </span>
                <a href="#" @click.prevent="toggleForm" class="mx-2 text-sm font-bold text-green-500 hover:underline">
                    {{ isLogin ? 'Register' : 'Login' }}
                </a>
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
        const isLogin = ref(true); // состояние для переключения между формами
        const name = ref('');
        const email = ref('');
        const password = ref('');
        const message = ref('');
        const isSuccess = ref(false);

        // Переключение формы
        const toggleForm = () => {
            isLogin.value = !isLogin.value;
        };

        // Функция входа
        const login = async () => {
            try {
                await store.dispatch('login', {email: email.value, password: password.value});
                isSuccess.value = true;
                message.value = 'Успешная авторизация!';
                router.push('/appeals');
            } catch (error) {
                isSuccess.value = false;
                message.value = error.response?.data?.message || 'Ошибка авторизации. Проверьте логин и пароль.';
            }
        };

        // Функция регистрации
        const register = async () => {
            try {
                await store.dispatch('register', {
                    name: name.value,
                    email: email.value,
                    password: password.value,
                    role: 'admin'
                });
                isSuccess.value = true;
                message.value = 'Пользователь зарегистрирован!';
                router.push('/appeals');
            } catch (error) {
                isSuccess.value = false;
                message.value = error.response?.data?.message || 'Ошибка регистрации.';
            }
        };

        return {name, email, password, message, isSuccess, login, register, isLogin, toggleForm};
    }
};
</script>
