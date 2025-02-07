<template>
    <form @submit.prevent="submitAppeal">
        <div>
            <label for="client_name">Client Name:</label>
            <input type="text" id="client_name" v-model="appeal.client_name" required>
        </div>
        <div>
            <label for="client_phone">Client Phone:</label>
            <input type="text" id="client_phone" v-model="appeal.client_phone" required>
        </div>
        <div>
            <label for="client_account">Client Account:</label>
            <input type="text" id="client_account" v-model="appeal.client_account" required>
        </div>
        <div>
            <label for="description">Description:</label>
            <textarea id="description" v-model="appeal.description" required></textarea>
        </div>
        <button type="submit">Submit Appeal</button>
    </form>
</template>

<script>
import {reactive} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export default {
    name: 'AppealForm',
    setup() {
        const store = useStore()
        const router = useRouter()

        const appeal = reactive({
            client_name: '',
            client_phone: '',
            client_account: '',
            description: ''
        })

        const submitAppeal = async () => {
            try {
                await store.dispatch('createAppeal', appeal)
                router.push('/appeals')
            } catch (error) {
                console.error('Failed to create appeal', error)
                // Handle error (e.g., show error message)
            }
        }

        return {
            appeal,
            submitAppeal
        }
    }
}
</script>
