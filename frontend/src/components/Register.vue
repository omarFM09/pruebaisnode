<template>
  <div class="register-container">
    <h2>Registro</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="nombre">Nombre</label> <!-- Cambiado a 'nombre' -->
        <input type="text" v-model="nombre" required /> <!-- Cambiado a 'nombre' -->
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Registrar</button>
    </form>
    <p>¿Ya tienes una cuenta? <router-link to="/login">Inicia sesión aquí</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterForm',
  data() {
    return {
      nombre: '',  
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:8080/api/register', {
          nombre: this.nombre,  
          email: this.email,
          password: this.password,
        });
        alert('Registro exitoso');
        this.$router.push('/login');
      } catch (error) {
        alert('Error al registrar usuario');
      }
    },
  },
};
</script>

<style>
.register-container {
  max-width: 400px;
  margin: auto;
}
.form-group {
  margin-bottom: 1rem;
}
</style>
