<template>
  <div class="container mx-auto mt-8 pb-4 px-4">
    <h1 class="text-2xl font-bold mb-4">Список пользователей</h1>

    <div class="flex items-center justify-between w-full mb-4">
      <!-- Поле поиска -->
      <div class="flex-1 mr-4">
        <input
            v-model="searchQuery"
            @input="searchUsers"
            type="text"
            class="w-full px-4 py-2 border rounded"
            placeholder="Поиск по имени, телефону и т.д."
        />
      </div>

      <!-- Кнопка создания нового пользователя -->
      <button
          @click="createNewUser()"
          class="px-4 py-2 bg-green-500 text-black rounded"
      >
        + Новый пользователь
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

          <!-- Кнопка редактирования -->
          <button
              @click="editUser(user)"
              class="px-4 py-2 bg-yellow-500 text-black rounded mt-2"
          >
            Редактировать
          </button>
          <button @click="deleteUser(user.id)" class="bg-red-500 text-white px-4 py-2 ml-4 rounded">
            Удалить
          </button>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 mt-4">
        Пользователей не найдено.
      </div>

      <div v-if="totalPages > 1" class="flex justify-between mt-4">
        <div>
          <button
              v-if="currentPage > 1"
              @click="changePage(currentPage - 1)"
              class="px-4 py-2 border text-black rounded transition-transform duration-300 hover:bg-gray-200"
          >
            Предыдущая
          </button>
        </div>
        <div>
          <button
              v-if="currentPage < totalPages"
              @click="changePage(currentPage + 1)"
              class="px-4 py-2 border text-black rounded transition-transform duration-300 hover:bg-gray-200"
          >
            Следующая
          </button>
        </div>
      </div>
    </div>

    <!-- Модальное окно для создания или редактирования пользователя -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">{{ isEdit ? 'Редактировать пользователя' : 'Создать нового пользователя' }}</h2>
        <form @submit.prevent="isEdit ? updateUser() : createUser">
          <div class="mb-4">
            <label class="block font-semibold">Имя</label>
            <input v-model="currentUser.name" type="text" required
                   class="w-full border px-4 py-2 rounded"/>
          </div>
          <div class="mb-4">
            <label class="block font-semibold">Email</label>
            <input v-model="currentUser.email" type="email" required
                   class="w-full border px-4 py-2 rounded"/>
          </div>
            <div class="mb-4">
                <label class="block font-semibold">Пароль</label>
                <input v-model="currentUser.password" type="text"
                       class="w-full border px-4 py-2 rounded"/>
            </div>
          <div class="mb-4">
            <label class="block font-semibold">Роль</label>
            <select v-model="currentUser.role" class="w-full border px-4 py-2 rounded">
              <option v-for="role in roles" :key="role.id" :value="role.name">{{ role.name }}</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="showModal = false"
                    class="px-4 py-2 bg-gray-400 text-white rounded mr-2">Отмена
            </button>
            <button type="submit" @click="createUser()" class="px-4 py-2 bg-blue-500 text-white rounded">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Users',
  data() {
    return {
      users: [],
      filteredUsers: [],
      loading: true,
      searchQuery: '',
      currentPage: 1,
      totalPages: 1,
      showModal: false, // Показывать модальное окно
      isEdit: false, // Флаг редактирования
      currentUser: {
        name: '',
        password: '',
        email: '',
        role: 'client', // Добавил роль по умолчанию
      },
      roles: [] // Массив ролей
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
        this.roles = response.data; // Сохраняем роли
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
              // user.password.toLowerCase().includes(searchText) ||
              user.email.toLowerCase().includes(searchText)
          );
        });
      }
    },

    editUser(user) {
      this.isEdit = true;
      this.currentUser = {...user}; // Копируем данные в форму редактирования
      this.showModal = true;
    },

      createNewUser() {
          this.isEdit = false; // Устанавливаем флаг на создание нового пользователя
          this.currentUser = {
              name: '', // Пустое имя по умолчанию
              password: '', // Пустой пароль по умолчанию
              email: '', // Пустой email по умолчанию
              role: 'client', // Роль по умолчанию
          };
          this.showModal = true; // Показываем модальное окно для создания нового пользователя
      },

      async updateUser() {
          try {
              const token = localStorage.getItem('authToken');
              await axios.put(`http://localhost:8000/api/users/${this.currentUser.id}`, this.currentUser, {
                  headers: { Authorization: `Bearer ${token}` },
              });
              await this.fetchUsers(); // Обновление списка пользователей
              this.showModal = false; // Закрытие модального окна
              this.filteredUsers = this.users; // Обновляем список фильтрованных пользователей
          } catch (error) {
              console.error('Ошибка при обновлении пользователя:', error);
          }
      },

      async createUser() {
          try {
              const token = localStorage.getItem('authToken');
              await axios.post('http://localhost:8000/api/users', this.currentUser, {
                  headers: { Authorization: `Bearer ${token}` },
              });
              await this.fetchUsers(); // Обновление списка пользователей
              this.showModal = false; // Закрытие модального окна
              this.filteredUsers = this.users; // Обновляем список фильтрованных пользователей
          } catch (error) {
              console.error('Ошибка при создании пользователя:', error);
          }
      },


      async deleteUser(id) {
      try {
        const token = localStorage.getItem('authToken');
        await axios.delete(`http://localhost:8000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.fetchUsers(); // Обновление списка пользователей
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
