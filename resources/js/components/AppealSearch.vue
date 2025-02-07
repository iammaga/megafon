<template>
    <div class="appeal-search">
        <input v-model="searchQuery" @input="search" placeholder="Search appeals...">
    </div>
</template>

<script>
import {ref} from 'vue'
import {useStore} from 'vuex'

export default {
    name: 'AppealSearch',
    setup() {
        const store = useStore()
        const searchQuery = ref('')

        const search = () => {
            store.dispatch('searchAppeals', searchQuery.value)
        }

        return {
            searchQuery,
            search
        }
    }
}
</script>
