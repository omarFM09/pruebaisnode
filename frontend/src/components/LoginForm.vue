<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="loginForm">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
    <p>¿No tienes una cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
  </div>
</template>

<script>

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api';
export default {
  name: 'LoginForm', // Asegúrate de que sea un nombre de componente de múltiples palabras
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async loginForm() {
      try {
        const response = await axios.post('/login', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('token', response.data.message);
        //localStorage.setItem('token', 'hola');
        //this.$router.push('/tasks'); // Redirigir a la lista de tareas
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style>
.login-container {
  max-width: 400px;
  margin: auto;
}
.form-group {
  margin-bottom: 1rem;
}
</style>
