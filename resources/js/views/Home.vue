<template>
  <div class="home">
    <h1>Welcome to Mini-CRM</h1>
    <p>Please login to access the system</p>
    <login-form></login-form>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'

export default {
  name: 'Home',
  components: {
    LoginForm
  }
}
</script>
