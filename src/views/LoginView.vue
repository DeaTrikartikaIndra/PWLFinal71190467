<template>
  <div class="login">
    <Login msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'

export default {
  name: 'LoginView',
  components: {
    Login
  }
}
</script>