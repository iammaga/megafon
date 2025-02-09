<template>
    <div class="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
        <h2 class="text-2xl font-bold mb-4 text-[#09ba5c]">Регистрация</h2>
        <form @submit.prevent="handleRegister">
            <input v-model="name" type="text" placeholder="Имя" class="input-field" required />
            <input v-model="email" type="email" placeholder="Email" class="input-field" required />
            <input v-model="password" type="password" placeholder="Пароль" class="input-field" required />
            <button type="submit" class="btn">Зарегистрироваться</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: ''
        };
    },
    methods: {
        ...mapActions(['login']),
        handleRegister() {
            this.login();
            this.$router.push('/'); // Перенаправление на главную страницу
        }
    }
};
</script>

<style scoped>
.input-field {
    @apply w-full p-2 border rounded mb-3;
}

.btn {
    @apply w-full bg-[#09ba5c] text-white py-2 rounded hover:bg-green-700 transition;
}
</style>
