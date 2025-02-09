<template>
    <div class="min-h-screen bg-gray-50 p-4">
        <div class="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 class="text-2xl font-bold text-gray-800">Добро пожаловать, {{ user.name }}</h1>

            <button @click="logout"
                    class="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                Выйти
            </button>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const user = store.getters.getUser;

        const logout = () => {
            store.dispatch('logout');
            router.push('/');
        };

        return { user, logout };
    }
};
</script>
