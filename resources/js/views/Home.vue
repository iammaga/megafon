<template>
  <div class="home">
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
