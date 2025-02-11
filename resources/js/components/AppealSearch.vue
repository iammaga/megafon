<template>
    <div class="appeal-search p-4">
        <input
            v-model="searchQuery"
            @input="search"
            placeholder="Поиск по обращениям..."
            class="border p-2 rounded-lg w-full"
        />
        <div v-if="isLoading" class="text-gray-500 mt-2">Загрузка...</div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'AppealSearch',
    setup() {
        const store = useStore();
        const searchQuery = ref('');
        const isLoading = ref(false);

        const search = () => {
            if (searchQuery.value.length >= 3) {
                isLoading.value = true;
                store.dispatch('searchAppeals', searchQuery.value);
            } else {
                store.dispatch('clearAppeals');
            }
        };

        return {
            searchQuery,
            search,
            isLoading,
        };
    },
};
</script>
