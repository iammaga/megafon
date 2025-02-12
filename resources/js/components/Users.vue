<template>
  <div class="container mx-auto mt-8 pb-4 px-4">
    <h1 class="text-2xl font-bold mb-4">Список пользователей</h1>
    <ul class="space-y-2">
      <li v-for="user in users" :key="user.id" class="border p-4 rounded-lg shadow mb-4">
        <p><strong>Имя:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Роль:</strong> {{ user.role_id }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Users',
  data() {
    return {
      users: []
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:8000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        this.users = response.data.data;
      } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
      }
    }
  }
};
</script>
