<template>
    <div class="home">
        <login-form></login-form>
        <register-form v-if="isRegistering"></register-form>
    </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';

export default {
    name: 'Home',
    components: {
        LoginForm,
        RegisterForm
    },
    data() {
        return {
            isRegistering: false
        };
    },
    methods: {
        toggleRegisterForm() {
            this.isRegistering = !this.isRegistering;
        }
    }
}
</script>
