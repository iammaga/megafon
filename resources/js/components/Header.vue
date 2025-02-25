<template>
    <header class="bg-white shadow-md">
        <nav class="container mx-auto flex justify-between items-center p-4">
            <div class="flex items-center space-x-4">
                <img class="w-auto h-7 sm:h-8"
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/MegaFon_logo_without_text.svg/2048px-MegaFon_logo_without_text.svg.png"
                     alt="Logo">
            </div>

            <ul class="hidden md:flex space-x-4">
                <li v-if="isAdmin">
                    <button @click="goToAppeals"
                            class="flex justify-center items-center w-36 px-4 py-2 border text-black rounded transition duration-300 hover:bg-gray-100">
                        Обращения
                    </button>
                </li>
                <li v-if="isAdmin">
                    <button @click="goToUsers"
                            class="flex justify-center items-center w-36 px-4 py-2 border text-black rounded transition duration-300 hover:bg-gray-100">
                        Пользователи
                    </button>
                </li>
            </ul>

            <button @click="toggleMenu" class="md:hidden text-gray-700 focus:outline-none">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>

            <div v-if="isMenuOpen" class="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
                <ul class="flex flex-col space-y-2 p-4">
                    <li v-if="user">
                        <span class="block text-center text-gray-700 font-medium px-4 py-2">{{ user.email }}</span>
                    </li>
                    <li v-if="isAdmin">
                        <button @click="goToAppeals"
                                class="flex justify-center items-center w-full px-4 py-2 border text-black rounded transition duration-300 hover:bg-gray-100">
                            Обращения
                        </button>
                    </li>
                    <li v-if="isAdmin">
                        <button @click="goToUsers"
                                class="flex justify-center items-center w-full px-4 py-2 border text-black rounded transition duration-300 hover:bg-gray-100">
                            Пользователи
                        </button>
                    </li>
                    <li>
                        <button @click="handleLogout"
                                class="flex justify-center items-center w-full px-4 py-2 bg-red-500 text-white rounded transition duration-300 hover:bg-red-600">
                            Выйти
                        </button>
                    </li>
                </ul>
            </div>

            <ul class="hidden md:flex space-x-6 items-center">
                <li v-if="user">
                    <span class="text-gray-700 font-medium">{{ user.email }}</span>
                </li>
                <li>
                    <button @click="handleLogout"
                            class="flex justify-center items-center w-32 px-4 py-2 bg-red-500 text-white rounded transition duration-300 hover:bg-red-600">
                        Выйти
                    </button>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex';

export default {
    name: 'Header',
    data() {
        return {
            isMenuOpen: false
        };
    },
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
            this.isMenuOpen = false;
        },
        goToAppeals() {
            this.$router.push('/appeals');
            this.isMenuOpen = false;
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        }
    },
    created() {
        this.$store.dispatch('fetchUser');
    }
};
</script>
