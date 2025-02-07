<template>
    <div class="appeal-list">
        <h3>Appeals List</h3>
        <ul>
            <li v-for="appeal in appeals" :key="appeal.id">
                {{ appeal.client_name }} - {{ appeal.status }}
                <button @click="viewAppeal(appeal.id)">View</button>
            </li>
        </ul>
    </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export default {
    name: 'AppealList',
    setup() {
        const store = useStore()
        const router = useRouter()

        const appeals = computed(() => store.state.appeals)

        const viewAppeal = (id) => {
            router.push(`/appeals/${id}`)
        }

        store.dispatch('fetchAppeals')

        return {
            appeals,
            viewAppeal
        }
    }
}
</script>
