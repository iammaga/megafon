<template>
    <div v-if="appeal" class="p-6">
        <h2 class="text-2xl mb-4">Детали обращения</h2>
        <p><strong>Имя клиента:</strong> {{ appeal.client_name }}</p>
        <p><strong>Телефон:</strong> {{ appeal.client_phone }}</p>
        <p><strong>Аккаунт:</strong> {{ appeal.client_account }}</p>
        <p><strong>Описание:</strong> {{ appeal.description }}</p>
        <p><strong>Статус:</strong> {{ appeal.status }}</p>
        <button
            @click="goBack"
            class="mt-4 bg-gray-500 text-white p-2 rounded"
        >
            Назад
        </button>
    </div>
    <div v-else class="p-6">
        <p>Загрузка...</p>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

export default {
    name: 'AppealDetails',
    setup() {
        const appeal = ref(null);
        const router = useRouter();
        const route = useRoute();

        const fetchAppeal = async () => {
            try {
                const response = await axios.get(`/appeals/${route.params.id}`);
                appeal.value = response.data;
            } catch (error) {
                console.error('Ошибка при получении деталей обращения:', error);
            }
        };

        const goBack = () => {
            router.back();
        };

        onMounted(fetchAppeal);

        return { appeal, goBack };
    },
};
</script>
