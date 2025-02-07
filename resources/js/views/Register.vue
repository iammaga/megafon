<template>
    <div class="register">
        <h2>Register</h2>
        <register-form></register-form>
    </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue'

export default {
    name: 'Register',
    components: {
        RegisterForm
    }
}
</script>
