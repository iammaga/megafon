<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Список обращений</h1>
        <div v-if="loading" class="text-gray-500">Загрузка...</div>
        <div v-else>
            <div v-for="appeal in appeals" :key="appeal.id" class="border p-4 rounded-lg shadow mb-4">
                <p><strong>ФИО:</strong> {{ appeal.client_name }}</p>
                <p><strong>Телефон:</strong> {{ appeal.client_phone }}</p>
                <p><strong>Лиц. счет:</strong> {{ appeal.client_account }}</p>
                <p><strong>Описание:</strong> {{ appeal.description }}</p>
                <p><strong>Статус:</strong> {{ appeal.status }}</p>
                <p><strong>Комментарий:</strong> {{ appeal.comment || 'Нет комментария' }}</p>
                <p><strong>Создано:</strong> {{ new Date(appeal.created_at).toLocaleString() }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Appeals',
    data() {
        return {
            appeals: [],
            loading: true,
        };
    },
    mounted() {
        this.fetchAppeals();
    },
    methods: {
        async fetchAppeals() {
            try {
                const token = localStorage.getItem('authToken'); // Автоматическое получение токена
                const response = await axios.get('http://localhost:8000/api/appeals', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.appeals = response.data.data;
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
