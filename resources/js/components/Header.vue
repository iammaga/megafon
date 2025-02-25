<template>
    <header class="bg-white shadow-md">
        <nav class="container mx-auto flex justify-between items-center p-4">
            <div class="flex items-center space-x-4">
                <img class="w-auto h-7 sm:h-8"
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/MegaFon_logo_without_text.svg/2048px-MegaFon_logo_without_text.svg.png"
                     alt="Logo">
            </div>
            <ul class="flex">
                <li v-if="isAdmin" class="px-2">
                    <button @click="goToAppeals"
                            class="px-4 py-2 border text-black rounded transition-transform duration-300 hover:bg-gray-100">
                        Обращения
                    </button>
                </li>
                <li v-if="isAdmin" class="px-2">
                    <button @click="goToUsers"
                            class="px-4 py-2 border text-black rounded transition-transform duration-300 hover:bg-gray-100">
                        Пользователи
                    </button>
                </li>
            </ul>
            <ul class="flex space-x-6 items-center">
                <li v-if="user">
                    <span class="text-gray-700 font-medium">{{ user.email }}</span>
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
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    name: 'Header',
    computed: {
        ...mapState(['user']),
        ...mapGetters(['isAdmin']),
    },
    methods: {
        ...mapActions(['logout']),
        handleLogout() {
            this.logout();
            this.$router.push('/');
        },
        goToUsers() {
            this.$router.push('/users');
        },
        goToAppeals() {
            this.$router.push('/appeals');
        }
    },
    created() {
        this.$store.dispatch('fetchUser');
    }
};
</script>
