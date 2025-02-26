<template>
    <div class="container mx-auto mt-8 pb-4 px-4">
        <h1 class="text-2xl font-bold mb-4">Список обращений</h1>

        <div class="flex items-center justify-between w-full mb-4">
            <!-- Поле поиска -->
            <div class="flex-1 mr-4">
                <div class="relative">
                    <search-icon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="20" />
                    <input
                        v-model="searchQuery"
                        @input="searchAppeals"
                        type="text"
                        class="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg p-3 flex-grow mr-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary transition-transform transform"
                        placeholder="Поиск по ФИО, телефону и т.д."
                    />
                </div>
            </div>

            <!-- Кнопка создания новой жалобы -->
            <button
                @click="createNewAppeal"
                class="p-2 bg-green-500 text-black rounded flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-lg hover:scale-105 transition"
                :class="{'w-12 h-12': true, 'md:w-auto md:px-4': true}"
            >
                <plus-icon size="20" />
                <span class="hidden md:inline ml-2">Новая жалоба</span>
            </button>
        </div>

        <div v-if="loading" class="text-gray-500">Загрузка...</div>
        <div v-else>
            <div v-if="filteredAppeals.length > 0">
                <div
                    v-for="appeal in filteredAppeals"
                    :key="appeal.id"
                    class="p-4 rounded-lg shadow mb-4 bg-gradient-to-br from-zinc-50 to-zinc-100 shadow-xl p-5 transition-transform transform hover:translate-x-2"
                >
                    <p><strong>ФИО:</strong> {{ appeal.client_name }}</p>
                    <p><strong>Телефон:</strong> {{ appeal.client_phone }}</p>
                    <p><strong>Лиц. счет:</strong> {{ appeal.client_account }}</p>
                    <p><strong>Описание:</strong> {{ appeal.description }}</p>
                    <p><strong>Статус:</strong>
                        <span :class="statusClass(appeal.status)" class="px-2 py-1 text-md font-medium rounded-lg">
                            {{ statusText(appeal.status) }}
                        </span>
                    </p>
                    <p><strong>Комментарий:</strong> {{ appeal.comment || 'Нет комментария' }}</p>
                    <p><strong>Создано:</strong> {{ new Date(appeal.created_at).toLocaleString() }}</p>

                    <!-- Кнопки действий -->
                    <div class="flex text-center mt-2 space-x-2">
                        <button
                            @click="editAppeal(appeal)"
                            class="p-2 bg-yellow-500 text-black rounded flex items-center justify-center bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition"
                            :class="{'w-12 h-12': true, 'md:w-auto md:px-4': true}"
                        >
                            <edit-icon size="20" />
                            <span class="hidden md:inline ml-2">Редактировать</span>
                        </button>
                        <button
                            @click="deleteAppeal(appeal.id)"
                            class="p-2 bg-red-500 text-white rounded flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                            :class="{'w-12 h-12': true, 'md:w-auto md:px-4': true}"
                        >
                            <trash-2-icon size="20" />
                            <span class="hidden md:inline ml-2">Удалить</span>
                        </button>
                    </div>
                </div>
            </div>

            <div v-else class="text-center text-gray-500 mt-4">
                Обращений не найдено.
            </div>

            <div v-if="totalPages > 1" class="flex justify-between mt-4">
                <button
                    v-if="currentPage > 1"
                    @click="changePage(currentPage - 1)"
                    class="p-2 border text-black rounded transition-transform duration-300 hover:bg-gray-200 flex items-center justify-center"
                    :class="{'w-12 h-12': true, 'md:w-auto md:px-4': true}"
                >
                    <chevron-left-icon size="20" />
                    <span class="hidden md:inline ml-2">Предыдущая</span>
                </button>
                <button
                    v-if="currentPage < totalPages"
                    @click="changePage(currentPage + 1)"
                    class="p-2 border text-black rounded transition-transform duration-300 hover:bg-gray-200 flex items-center justify-center"
                    :class="{'w-12 h-12': true, 'md:w-auto md:px-4': true}"
                >
                    <chevron-right-icon size="20" />
                    <span class="hidden md:inline ml-2">Следующая</span>
                </button>
            </div>
        </div>

        <!-- Модальное окно для создания или редактирования жалобы -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 class="text-xl font-bold mb-4">{{ isEdit ? 'Редактировать жалобу' : 'Создать новую жалобу' }}</h2>
                <form @submit.prevent="isEdit ? updateAppeal() : createAppeal()">
                    <div class="mb-4">
                        <label class="text-sm font-medium text-muted-foreground">ФИО клиента</label>
                        <input v-model="currentAppeal.client_name" type="text" required class="mt-1 block w-full p-3 border border-slate-400 rounded-md focus:ring-2 focus:ring-ring transition duration-200"/>
                    </div>
                    <div class="mb-4">
                        <label class="text-sm font-medium text-muted-foreground">Телефон клиента</label>
                        <input v-model="currentAppeal.client_phone" type="text" required class="mt-1 block w-full p-3 border border-slate-400 rounded-md focus:ring-2 focus:ring-ring transition duration-200"/>
                    </div>
                    <div class="mb-4">
                        <label class="text-sm font-medium text-muted-foreground">Лицевой счет</label>
                        <input v-model="currentAppeal.client_account" type="text" required class="mt-1 block w-full p-3 border border-slate-400 rounded-md focus:ring-2 focus:ring-ring transition duration-200"/>
                    </div>
                    <div class="mb-4">
                        <label class="text-sm font-medium text-muted-foreground">Описание проблемы</label>
                        <textarea v-model="currentAppeal.description" required class="mt-1 block w-full p-3 border border-slate-400 rounded-md focus:ring-2 focus:ring-ring transition duration-200"></textarea>
                    </div>

                    <!-- Показываем только при редактировании -->
                    <div v-if="isEdit">
                        <div class="mb-4">
                            <label class="text-sm font-medium text-muted-foreground">Ответственное лицо</label>
                            <select v-model="currentAppeal.assigned_to" id="assigned_to" class="mt-1 block w-full p-3 border border-slate-400 rounded-md focus:ring-2 focus:ring-ring transition duration-200">
                                <option v-for="user in users" :key="user.id" :value="user.id">
                                    {{ user.name }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label class="text-sm font-medium text-muted-foreground">Статус</label>
                            <select v-model="currentAppeal.status" class="mt-1 block w-full p-3 border border-slate-400 rounded-md focus:ring-2 focus:ring-ring transition duration-200">
                                <option value="new">Новое</option>
                                <option value="in_progress">В процессе</option>
                                <option value="resolved">Решено</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label class="text-sm font-medium text-muted-foreground">Комментарий</label>
                            <textarea v-model="currentAppeal.comment" class="mt-1 block w-full p-3 border border-slate-400 rounded-md focus:ring-2 focus:ring-ring transition duration-200"></textarea>
                        </div>
                    </div>

                    <div class="flex justify-between">
                        <button type="button" @click="showModal = false" class="p-2 bg-red-500 text-white rounded flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition" :class="{'w-12 h-12': true, 'md:w-auto md:px-4': true}">
                            <x-icon size="20" />
                            <span class="hidden md:inline ml-2 rounded-lg transition duration-200">Отмена</span>
                        </button>
                        <button type="submit" class="bg-green-500 text-black rounded flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-lg hover:scale-105 transition" :class="{'w-12 h-12': true, 'md:w-auto md:px-4': true}">
                            <save-icon size="20" />
                            <span class="hidden md:inline ml-2 rounded-lg transition duration-200">Сохранить</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {
    Search as SearchIcon,
    Plus as PlusIcon,
    Edit as EditIcon,
    Trash2 as Trash2Icon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    X as XIcon,
    Save as SaveIcon
} from 'lucide-vue-next';

export default {
    name: 'Appeals',
    components: {
        SearchIcon,
        PlusIcon,
        EditIcon,
        Trash2Icon,
        ChevronLeftIcon,
        ChevronRightIcon,
        XIcon,
        SaveIcon
    },
    data() {
        return {
            roles: [],
            users: [],
            appeals: [],
            filteredAppeals: [],
            loading: true,
            searchQuery: '',
            currentPage: 1,
            totalPages: 1,
            showModal: false,
            isEdit: false,
            currentAppeal: {
                client_name: '',
                client_phone: '',
                client_account: '',
                description: '',
                responsible_person: '',
                status: '',
                comment: '',
                assigned_to: '',
            },
        };
    },
    mounted() {
        this.fetchAppeals();
        this.fetchUsers();
        this.fetchRoles();
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
            console.log("Отправляем жалобу:", this.currentAppeal); // Проверка данных
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.post(
                    "http://localhost:8000/api/appeals",
                    this.currentAppeal,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log("Ответ сервера:", response.data);
                this.showModal = false;
            } catch (error) {
                console.error("Ошибка при создании жалобы:", error.response?.data || error);
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
        async fetchRoles() {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:8000/api/roles', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.roles = response.data; // Предполагаем, что API возвращает массив ролей
            } catch (error) {
                console.error('Ошибка при загрузке ролей:', error);
            }
        },
        async fetchUsers() {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:8000/api/users', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // console.log(response.data.data)
                this.users = response.data.data; // Предполагаем, что API возвращает массив ролей
            } catch (error) {
                console.error('Ошибка при загрузке ролей:', error);
            }
        },
        statusClass(status) {
            const statusClasses = {
                new: 'text-blue-500',
                in_progress: 'text-yellow-500',
                resolved: 'text-green-500'
            };
            return statusClasses[status] || 'bg-gray-500';
        },
        statusText(status) {
            const statusTexts = {
                new: 'Новое',
                in_progress: 'В процессе',
                resolved: 'Решено'
            };
            return statusTexts[status] || 'Неизвестно';
        }
    },
};
</script>

<style scoped>
body.modal-open {
    overflow: hidden;
}
</style>
