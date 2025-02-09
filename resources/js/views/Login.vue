<template>
    <div class="login">
<!--        <h2>Login</h2>-->
        <login-form></login-form>
    </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'

export default {
    name: 'Login',
    components: {
        LoginForm
    }
}
</script>
