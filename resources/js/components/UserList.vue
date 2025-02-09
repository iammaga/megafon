<template>
    <div class="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-xl mt-6">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">Список пользователей</h3>
        <ul class="divide-y divide-gray-200">
            <li v-for="user in users" :key="user.id" class="flex items-center justify-between py-3">
                <div>
                    <p class="text-lg font-medium text-gray-900">{{ user.name }}</p>
                    <p class="text-sm text-gray-500">{{ user.email }}</p>
                    <span
                        :class="{
                            'bg-blue-100 text-blue-800': user.role === 'operator',
                            'bg-green-100 text-green-800': user.role === 'back_office',
                            'bg-red-100 text-red-800': user.role === 'admin',
                            'bg-gray-100 text-gray-800': !user.role
                        }"
                        class="inline-block px-2 py-1 text-xs font-semibold rounded-md mt-1"
                    >
                        {{ user.role || 'Нет роли' }}
                    </span>
                </div>
                <button
                    @click="editUser(user.id)"
                    class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md transition duration-200"
                >
                    Редактировать
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: 'UserList',
    setup() {
        const store = useStore();
        const router = useRouter();

        const users = computed(() => store.state.users);

        const editUser = (id) => {
            router.push(`/users/${id}/edit`);
        };

        onMounted(() => {
            store.dispatch('fetchUsers');
        });

        return {
            users,
            editUser
        };
    }
};
</script>

<style scoped>
/* Дополнительные стили (при необходимости) */
</style>
