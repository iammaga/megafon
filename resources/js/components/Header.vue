<template>
    <header class="bg-white shadow-md">
        <nav class="container mx-auto flex justify-between items-center p-4">
            <div class="flex items-center space-x-4">
                <img class="w-auto h-7 sm:h-8"
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/MegaFon_logo_without_text.svg/2048px-MegaFon_logo_without_text.svg.png"
                     alt="Logo">
            </div>
            <ul class="flex space-x-6 items-center">
                <li>
                    <button @click="goToUsers"
                            class="px-4 py-2 border text-black rounded transition-transform duration-300 hover:bg-gray-100">
                        Пользователи
                    </button>
                </li>
                <li>
                    <button @click="handleLogout"
                            class="px-4 py-2 bg-red-500 text-white rounded transition-transform duration-300 hover:bg-red-600">
                        Выйти
                    </button>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Header',
    methods: {
        ...mapActions(['logout']),
        handleLogout() {
            this.logout();
            this.$router.push('/');
        },
        goToUsers() {
            this.$router.push('/users'); // Навигация на страницу пользователей
        }
    }
};
</script>

<style scoped>
/* Стиль для кнопок */
.btn-logout, .btn-users {
    @apply flex items-center px-4 py-2 rounded transition-transform duration-300;
    @apply hover:scale-105 hover:shadow-lg;
}

.btn-users {
    @apply bg-yellow-500 text-black;
}

.btn-logout {
    @apply bg-red-500 text-white;
}

/* Навигация */
.nav-link {
    @apply text-gray-600 hover:text-green-500 transition-colors duration-300 font-medium;
}

.active-link {
    @apply text-green-500 font-semibold border-b-2 border-green-500;
}
</style>
