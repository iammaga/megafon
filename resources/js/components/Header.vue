<template>
    <header class="bg-white shadow-md">
        <nav class="container mx-auto flex justify-between items-center p-4">
            <div class="flex">
                <img class="w-auto h-7 sm:h-8"
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/MegaFon_logo_without_text.svg/2048px-MegaFon_logo_without_text.svg.png"
                     alt="Logo">
            </div>
            <ul class="flex space-x-6 items-center">
                <li>
                    <button @click="handleLogout" class="btn-logout">
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
        }
    }
};
</script>

<style scoped>
.nav-link {
    @apply text-gray-600 hover:text-green-500 transition-colors duration-300 font-medium;
}

.active-link {
    @apply text-green-500 font-semibold border-b-2 border-green-500;
}

.btn-logout {
    @apply flex items-center bg-green-500 text-white px-4 py-2 rounded transition-transform duration-300;
    @apply hover:bg-red-500 hover:scale-105 hover:shadow-lg;
}
</style>
