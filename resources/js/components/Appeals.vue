<template>
    <div class="container mx-auto mt-8 pb-4 px-4">
        <h1 class="text-2xl font-bold mb-4">Список обращений</h1>

        <div class="flex items-center justify-between w-full mb-4">
            <!-- Поле поиска -->
            <div class="flex-1 mr-4">
                <input
                    v-model="searchQuery"
                    @input="searchAppeals"
                    type="text"
                    class="w-full px-4 py-2 border rounded"
                    placeholder="Поиск по ФИО, телефону и т.д."
                />
            </div>

            <!-- Кнопка создания новой жалобы -->
            <button
                @click="createNewAppeal"
                class="px-4 py-2 bg-green-500 text-black rounded"
            >
                + Новая жалоба
            </button>
        </div>

        <div v-if="loading" class="text-gray-500">Загрузка...</div>
        <div v-else>
            <div v-if="filteredAppeals.length > 0">
                <div
                    v-for="appeal in filteredAppeals"
                    :key="appeal.id"
                    class="border p-4 rounded-lg shadow mb-4"
                >
                    <p><strong>ФИО:</strong> {{ appeal.client_name }}</p>
                    <p><strong>Телефон:</strong> {{ appeal.client_phone }}</p>
                    <p><strong>Лиц. счет:</strong> {{ appeal.client_account }}</p>
                    <p><strong>Описание:</strong> {{ appeal.description }}</p>
                    <p><strong>Статус:</strong> {{ appeal.status }}</p>
                    <p><strong>Комментарий:</strong> {{ appeal.comment || 'Нет комментария' }}</p>
                    <p><strong>Создано:</strong> {{ new Date(appeal.created_at).toLocaleString() }}</p>

                    <!-- Кнопка редактирования -->
                    <button
                        @click="editAppeal(appeal)"
                        class="px-4 py-2 bg-yellow-500 text-black rounded mt-2"
                    >
                        Редактировать
                    </button>
                    <button @click="deleteAppeal(appeal.id)" class="bg-red-500 text-white px-4 py-2 ml-4 rounded">
                        Удалить
                    </button>
                </div>
            </div>

            <div v-else class="text-center text-gray-500 mt-4">
                Обращений не найдено.
            </div>

            <div v-if="totalPages > 1" class="flex justify-between mt-4">
                <div>
                    <button
                        v-if="currentPage > 1"
                        @click="changePage(currentPage - 1)"
                        class="px-4 py-2 bg-green-500 text-black rounded"
                    >
                        Предыдущая
                    </button>
                </div>
                <div>
                    <button
                        v-if="currentPage < totalPages"
                        @click="changePage(currentPage + 1)"
                        class="px-4 py-2 bg-green-500 text-black rounded"
                    >
                        Следующая
                    </button>
                </div>
            </div>
        </div>

        <!-- Модальное окно для создания или редактирования жалобы -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 class="text-xl font-bold mb-4">{{ isEdit ? 'Редактировать жалобу' : 'Создать новую жалобу' }}</h2>
                <form @submit.prevent="isEdit ? updateAppeal() : createAppeal">
                    <div class="mb-4">
                        <label class="block font-semibold">ФИО клиента</label>
                        <input v-model="currentAppeal.client_name" type="text" required
                               class="w-full border px-4 py-2 rounded"/>
                    </div>
                    <div class="mb-4">
                        <label class="block font-semibold">Телефон клиента</label>
                        <input v-model="currentAppeal.client_phone" type="text" required
                               class="w-full border px-4 py-2 rounded"/>
                    </div>
                    <div class="mb-4">
                        <label class="block font-semibold">Лицевой счет</label>
                        <input v-model="currentAppeal.client_account" type="text" required
                               class="w-full border px-4 py-2 rounded"/>
                    </div>
                    <div class="mb-4">
                        <label class="block font-semibold">Описание проблемы</label>
                        <textarea v-model="currentAppeal.description" required
                                  class="w-full border px-4 py-2 rounded"></textarea>
                    </div>
                    <div class="mb-4">
                        <label class="block font-semibold">Ответственное лицо</label>
                        <input v-model="currentAppeal.responsible_person" type="text" class="w-full border px-4 py-2 rounded"/>
                    </div>
                    <div class="mb-4">
                        <label class="block font-semibold">Статус</label>
                        <select v-model="currentAppeal.status" class="w-full border px-4 py-2 rounded">
                            <option value="new">Новое</option>
                            <option value="in_progress">В процессе</option>
                            <option value="resolved">Решено</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block font-semibold">Комментарий</label>
                        <textarea v-model="currentAppeal.comment" class="w-full border px-4 py-2 rounded"></textarea>
                    </div>
                    <div class="flex justify-end">
                        <button type="button" @click="showModal = false"
                                class="px-4 py-2 bg-gray-400 text-white rounded mr-2">Отмена
                        </button>
                        <button type="submit" @click="createAppeal()" class="px-4 py-2 bg-blue-500 text-white rounded">Сохранить</button>
                    </div>
                </form>
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
            filteredAppeals: [],
            loading: true,
            searchQuery: '',
            currentPage: 1,
            totalPages: 1,
            showModal: false, // Показывать модальное окно
            isEdit: false, // Флаг редактирования
            currentAppeal: {
                client_name: '',
                client_phone: '',
                client_account: '',
                description: '',
                responsible_person: '',
                status: '',
                comment: '',
            },
        };
    },
    mounted() {
        this.fetchAppeals();
    },
    methods: {
        async fetchAppeals(page = 1) {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`http://localhost:8000/api/appeals?page=${page}`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                this.appeals = response.data.data;
                this.filteredAppeals = this.appeals;
                this.currentPage = response.data.current_page;
                this.totalPages = response.data.last_page;
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            } finally {
                this.loading = false;
            }
        },

        changePage(page) {
            this.fetchAppeals(page);
        },

        searchAppeals() {
            if (this.searchQuery.trim() === '') {
                this.filteredAppeals = this.appeals;
            } else {
                const searchText = this.searchQuery.toLowerCase();
                this.filteredAppeals = this.appeals.filter(appeal => {
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

        editAppeal(appeal) {
            this.isEdit = true;
            this.currentAppeal = {...appeal}; // Копируем данные в форму редактирования
            this.showModal = true;
        },

        createNewAppeal() {
            this.isEdit = false;
            this.currentAppeal = {
                client_name: '',
                client_phone: '',
                client_account: '',
                description: '',
                status: 'new'
            };
            this.showModal = true;
        },

        async updateAppeal() {
            try {
                const token = localStorage.getItem('authToken');
                await axios.put(`http://localhost:8000/api/appeals/${this.currentAppeal.id}`, this.currentAppeal, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.fetchAppeals(); // Обновление списка
                this.showModal = false; // Закрытие модального окна после успешного редактирования
            } catch (error) {
                console.error('Ошибка при обновлении жалобы:', error);
            }
        },

        async createAppeal() {
            try {
                const token = localStorage.getItem('authToken');
                await axios.post('http://localhost:8000/api/appeals', this.currentAppeal, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.fetchAppeals(); // Обновление списка
                this.showModal = false; // Закрытие модального окна после успешного сохранения
            } catch (error) {
                console.error('Ошибка при создании жалобы:', error);
            }
        },

        async deleteAppeal(id) {
            try {
                const token = localStorage.getItem('authToken');
                await axios.delete(`http://localhost:8000/api/appeals/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.fetchAppeals(); // Обновление списка жалоб
            } catch (error) {
                console.error('Ошибка при удалении жалобы:', error);
            }
        },
    },
};
</script>

<style scoped>
body.modal-open {
    overflow: hidden;
}
</style>
