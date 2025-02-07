<template>
    <div class="user-list">
        <h3>Users List</h3>
        <ul>
            <li v-for="user in users" :key="user.id">
                {{ user.name }} - {{ user.role || 'Нет роли' }}
                <button @click="editUser(user.id)">Edit</button>
            </li>
        </ul>
    </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export default {
    name: 'UserList',
    setup() {
        const store = useStore()
        const router = useRouter()

        const users = computed(() => store.state.users)

        const editUser = (id) => {
            router.push(`/users/${id}/edit`)
        }

        store.dispatch('fetchUsers')

        return {
            users,
            editUser
        }
    }
}
</script>
