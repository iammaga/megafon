<template>
    <div class="container mx-auto mt-8 pb-4 px-4">
        <h1 class="text-2xl font-bold mb-4">Список пользователей</h1>

        <div class="flex items-center justify-between w-full mb-4">
            <!-- Поле поиска -->
            <div class="flex-1 mr-4">
                <div class="relative">
                    <search-icon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="20" />
                    <input
                        v-model="searchQuery"
                        @input="searchUsers"
                        type="text"
                        class="w-full pl-10 pr-4 py-2 border rounded"
                        placeholder="Поиск по имени, email и т.д."
                    />
                </div>
            </div>

            <!-- Кнопка создания нового пользователя -->
            <button
                @click="createNewUser()"
                class="p-2 bg-green-500 text-black rounded flex items-center justify-center"
                :class="{'w-12 h-12': true, 'md:w-auto md:px-4': true}"
            >
                <user-plus-icon size="20" />
                <span class="hidden md:inline ml-2">Новый пользователь</span>
            </button>
        </div>

        <div v-if="loading" class="text-gray-500">Загрузка...</div>
        <div v-else>
            <div v-if="filteredUsers.length > 0">
                <div
                    v-for="user in filteredUsers"
                    :key="user.id"
                    class="border p-4 rounded-lg shadow mb-4"
                >
                    <p><strong>Имя:</strong> {{ user.name }}</p>
                    <p><strong>Email:</strong> {{ user.email }}</p>
                    <p><strong>Роль:</strong> {{ user.role.name }}</p>

                    <!-- Кнопки действий -->
                    <div class="flex text-center mt-2 space-x-2">
                        <button
                            @click="editUser(user)"
                            class="p-2 bg-yellow-500 text-black rounded flex items-center justify-center"
                            :class="{'w-12 h-12': true, 'md:w-auto md:px-4': true}"
                        >
                            <edit-icon size="20" />
                            <span class="hidden md:inline ml-2">Редактировать</span>
                        </button>
                        <button
                            @click="deleteUser(user.id)"
                            class="p-2 bg-red-500 text-white rounded flex items-center justify-center"
                            :class="{'w-12 h-12': true, 'md:w-auto md:px-4': true}"
                        >
                            <trash-2-icon size="20" />
                            <span class="hidden md:inline ml-2">Удалить</span>
                        </button>
                    </div>
                </div>
            </div>

            <div v-else class="text-center text-gray-500 mt-4">
                Пользователей не найдено.
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

        <!-- Модальное окно для создания или редактирования пользователя -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 class="text-xl font-bold mb-4">{{ isEdit ? 'Редактировать пользователя' : 'Создать нового пользователя' }}</h2>
                <form @submit.prevent="isEdit ? updateUser() : createUser()">
                    <div class="mb-4">
                        <label class="block font-semibold">Имя</label>
                        <input v-model="currentUser.name" type="text" required class="w-full border px-4 py-2 rounded"/>
                    </div>
                    <div class="mb-4">
                        <label class="block font-semibold">Email</label>
                        <input v-model="currentUser.email" type="email" required class="w-full border px-4 py-2 rounded"/>
                    </div>
                    <div class="mb-4">
                        <label class="block font-semibold">Пароль</label>
                        <input v-model="currentUser.password" type="password" class="w-full border px-4 py-2 rounded"/>
                    </div>
                    <div class="mb-4">
                        <label class="block font-semibold">Роль</label>
                        <select v-model="currentUser.role" class="w-full border px-4 py-2 rounded">
                            <option v-for="role in roles" :key="role.id" :value="role.name">{{ role.name }}</option>
                        </select>
                    </div>
                    <div class="flex justify-end">
                        <button type="button" @click="showModal = false" class="p-2 bg-gray-400 text-black rounded mr-2 flex items-center justify-center" :class="{'w-12 h-12': true, 'md:w-auto md:px-4': true}">
                            <x-icon size="20" />
                            <span class="hidden md:inline ml-2">Отмена</span>
                        </button>
                        <button type="submit" class="p-2 bg-blue-500 text-white rounded flex items-center justify-center" :class="{'w-12 h-12': true, 'md:w-auto md:px-4': true}">
                            <save-icon size="20" />
                            <span class="hidden md:inline ml-2">Сохранить</span>
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
    UserPlus as UserPlusIcon,
    Edit as EditIcon,
    Trash2 as Trash2Icon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    X as XIcon,
    Save as SaveIcon
} from 'lucide-vue-next';

export default {
    name: 'Users',
    components: {
        SearchIcon,
        UserPlusIcon,
        EditIcon,
        Trash2Icon,
        ChevronLeftIcon,
        ChevronRightIcon,
        XIcon,
        SaveIcon
    },
    data() {
        return {
            users: [],
            filteredUsers: [],
            loading: true,
            searchQuery: '',
            currentPage: 1,
            totalPages: 1,
            showModal: false,
            isEdit: false,
            currentUser: {
                name: '',
                password: '',
                email: '',
                role: 'client',
            },
            roles: []
        };
    },
    mounted() {
        this.fetchUsers();
        this.fetchRoles();
    },
    methods: {
        async fetchUsers(page = 1) {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`http://localhost:8000/api/users?page=${page}`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                this.users = response.data.data;
                this.filteredUsers = this.users;
                this.currentPage = response.data.current_page;
                this.totalPages = response.data.last_page;
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchRoles() {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:8000/api/roles', {
                    headers: {Authorization: `Bearer ${token}`},
                });
                this.roles = response.data;
            } catch (error) {
                console.error('Ошибка при получении ролей:', error);
            }
        },

        changePage(page) {
            this.fetchUsers(page);
        },

        searchUsers() {
            if (this.searchQuery.trim() === '') {
                this.filteredUsers = this.users;
            } else {
                const searchText = this.searchQuery.toLowerCase();
                this.filteredUsers = this.users.filter(user => {
                    return (
                        user.name.toLowerCase().includes(searchText) ||
                        user.email.toLowerCase().includes(searchText)
                    );
                });
            }
        },

        editUser(user) {
            this.isEdit = true;
            this.currentUser = {
                ...user,
                role: user.role.name,
            };
            this.showModal = true;
        },

        createNewUser() {
            this.isEdit = false;
            this.currentUser = {
                name: '',
                password: '',
                email: '',
                role: 'client',
            };
            this.showModal = true;
        },

        async updateUser() {
            try {
                const token = localStorage.getItem('authToken');
                await axios.put(`http://localhost:8000/api/users/${this.currentUser.id}`, this.currentUser, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                await this.fetchUsers();
                this.showModal = false;
                this.filteredUsers = this.users;
            } catch (error) {
                console.error('Ошибка при обновлении пользователя:', error);
            }
        },

        async createUser() {
            try {
                const token = localStorage.getItem('authToken');
                await axios.post('http://localhost:8000/api/users', this.currentUser, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                await this.fetchUsers();
                this.showModal = false;
                this.filteredUsers = this.users;
            } catch (error) {
                console.error('Ошибка при создании пользователя:', error);
            }
        },

        async deleteUser(id) {
            try {
                const token = localStorage.getItem('authToken');
                await axios.delete(`http://localhost:8000/api/users/${id}`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                this.fetchUsers();
            } catch (error) {
                console.error('Ошибка при удалении пользователя:', error);
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
