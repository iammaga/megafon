<template>
    <nav>
        <router-link to="/appeals">Обращения</router-link>
        <router-link to="/create-appeal" v-if="canCreateAppeal">Создать обращение</router-link>
        <router-link to="/users" v-if="isAdmin">Пользователи</router-link>
        <span>{{ user.name }}</span>
        <button @click="logout">Выйти</button>
    </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const store = useStore()
        const router = useRouter()

        const user = computed(() => store.state.user)
        const canCreateAppeal = computed(() => ['operator', 'back_office'].includes(user.value.role))
        const isAdmin = computed(() => user.value.role === 'admin')

        const logout = async () => {
            await store.dispatch('logout')
            router.push('/login')
        }

        return { user, canCreateAppeal, isAdmin, logout }
    }
}
</script>
