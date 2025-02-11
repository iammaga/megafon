<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Список обращений</h1>

        <!-- Поле поиска -->
        <div class="mb-4">
            <input
                v-model="searchQuery"
                @input="searchAppeals"
                type="text"
                class="px-4 py-2 border rounded"
                placeholder="Поиск по ФИО, телефону и т.д."
            />
        </div>

        <div v-if="loading" class="text-gray-500">Загрузка...</div>
        <div v-else>
            <!-- Отображение обращений -->
            <div v-for="appeal in filteredAppeals" :key="appeal.id" class="border p-4 rounded-lg shadow mb-4">
                <p><strong>ФИО:</strong> {{ appeal.client_name }}</p>
                <p><strong>Телефон:</strong> {{ appeal.client_phone }}</p>
                <p><strong>Лиц. счет:</strong> {{ appeal.client_account }}</p>
                <p><strong>Описание:</strong> {{ appeal.description }}</p>
                <p><strong>Статус:</strong> {{ appeal.status }}</p>
                <p><strong>Комментарий:</strong> {{ appeal.comment || 'Нет комментария' }}</p>
                <p><strong>Создано:</strong> {{ new Date(appeal.created_at).toLocaleString() }}</p>
            </div>

            <!-- Пагинация -->
            <div v-if="totalPages > 1" class="flex justify-between mt-4">
                <button
                    v-if="currentPage > 1"
                    @click="changePage(currentPage - 1)"
                    class="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Предыдущая
                </button>
                <button
                    v-if="currentPage < totalPages"
                    @click="changePage(currentPage + 1)"
                    class="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Следующая
                </button>
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
            appeals: [],            // Данные обращений
            filteredAppeals: [],    // Отфильтрованные обращения
            loading: true,          // Состояние загрузки
            searchQuery: '',        // Запрос поиска
            currentPage: 1,         // Текущая страница
            totalPages: 1,          // Общее количество страниц
        };
    },
    mounted() {
        this.fetchAppeals();
    },
    methods: {
        // Получение данных с сервера
        async fetchAppeals(page = 1) {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`http://localhost:8000/api/appeals?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Присваиваем данные и пагинацию
                this.appeals = response.data.data;
                this.filteredAppeals = this.appeals; // Изначально все обращения отображаются
                this.currentPage = response.data.current_page;
                this.totalPages = response.data.last_page;
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            } finally {
                this.loading = false;
            }
        },

        // Изменение страницы
        changePage(page) {
            this.fetchAppeals(page);
        },

        // Поиск обращений
        searchAppeals() {
            if (this.searchQuery.trim() === '') {
                this.filteredAppeals = this.appeals;
            } else {
                this.filteredAppeals = this.appeals.filter(appeal => {
                    const searchText = this.searchQuery.toLowerCase();
                    return (
                        appeal.client_name.toLowerCase().includes(searchText) ||
                        appeal.client_phone.toLowerCase().includes(searchText) ||
                        appeal.client_account.toLowerCase().includes(searchText) ||
                        appeal.description.toLowerCase().includes(searchText) ||
                        (appeal.status && appeal.status.toLowerCase().includes(searchText)) ||
                        (appeal.comment && appeal.comment.toLowerCase().includes(searchText))
                    );
                });
            }
        },
    },
};
</script>
