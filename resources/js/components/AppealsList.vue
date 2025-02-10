<template>
    <div class="p-4 max-w-2xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Список жалоб</h1>

        <button
            @click="logout"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mb-4"
        >
            Выйти
        </button>

        <ul class="space-y-3">
            <li v-for="appeal in appeals" :key="appeal.id" class="border p-3 rounded shadow">
                <h2 class="text-xl font-semibold">{{ appeal.title }}</h2>
                <p>{{ appeal.description }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            appeals: [] // Список жалоб
        };
    },
    mounted() {
        this.fetchAppeals(); // Загружаем жалобы при открытии страницы
    },
    methods: {
        async fetchAppeals() {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch('http://localhost:8000/api/appeals', {
                    headers: {
                        Authorization: `Bearer ${token}` // Отправляем токен для авторизации
                    }
                });
                const data = await response.json();
                this.appeals = data; // Сохраняем данные в переменной
            } catch (error) {
                console.error('Ошибка загрузки жалоб:', error);
            }
        },
        logout() {
            localStorage.removeItem('authToken');
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
h1 {
    color: #2d3748;
}
</style>
