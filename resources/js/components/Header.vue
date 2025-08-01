<template>
    <header class="bg-white shadow-md relative">
        <nav class="container mx-auto flex justify-between items-center p-4">
            <div class="flex items-center space-x-4">
                <img class="w-auto h-7 sm:h-8"
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/MegaFon_logo_without_text.svg/2048px-MegaFon_logo_without_text.svg.png"
                     alt="Logo">
                <span class="font-medium text-gray-700">Megafon Tajikistan</span>
            </div>

            <ul class="hidden md:flex space-x-4">
                <li v-if="isAdmin">
                    <button @click="goToAppeals"
                            class="flex items-center space-x-2 px-4 py-2 border text-black rounded transition duration-300 hover:bg-gray-100">
                        <message-square-icon size="20" />
                        <span class="text-sm">Обращения</span>
                    </button>
                </li>
                <li v-if="isAdmin">
                    <button @click="goToUsers"
                            class="flex items-center space-x-2 px-4 py-2 border text-black rounded transition duration-300 hover:bg-gray-100">
                        <users-icon size="20" />
                        <span class="text-sm">Пользователи</span>
                    </button>
                </li>
            </ul>

            <button @click="toggleMenu" class="md:hidden text-gray-700 focus:outline-none z-20">
                <menu-icon v-if="!isMenuOpen" size="24" />
                <x-icon v-else size="24" />
            </button>

            <ul class="hidden md:flex space-x-6 items-center">
                <li v-if="user">
                    <span class="text-gray-700 font-medium">{{ user.email }}</span>
                </li>
                <li>
                    <button @click="handleLogout"
                            class="flex justify-center items-center w-12 h-12 bg-red-500 text-white rounded transition duration-300 hover:bg-red-600">
                        <log-out-icon size="20" />
                        <span class="sr-only">Выйти</span>
                    </button>
                </li>
            </ul>
        </nav>

        <!-- Мобильное меню -->
        <transition
            enter-active-class="transition ease-out duration-100 transform"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75 transform"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div v-if="isMenuOpen" class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10">
                <div class="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div class="px-2 pt-2 pb-3 space-y-1">
                        <span v-if="user" class="flex justify-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 mt-8">
                          {{ user.email }}
                        </span>
                        <button v-if="isAdmin" @click="goToAppeals"
                                class="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            <message-square-icon size="20" class="inline-block mr-2" />
                            Обращения
                        </button>
                        <button v-if="isAdmin" @click="goToUsers"
                                class="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            <users-icon size="20" class="inline-block mr-2" />
                            Пользователи
                        </button>
                        <button @click="handleLogout"
                                class="block w-full px-3 py-2 rounded-md text-base font-medium text-white bg-red-500 hover:bg-red-600">
                            <log-out-icon size="20" class="inline-block mr-2" />
                            Выйти
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </header>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { MessageSquareIcon, UsersIcon, MenuIcon, LogOutIcon, XIcon } from 'lucide-vue-next';

export default {
    name: 'Header',
    components: {
        MessageSquareIcon,
        UsersIcon,
        MenuIcon,
        LogOutIcon,
        XIcon
    },
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
            this.isMenuOpen = false;
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
