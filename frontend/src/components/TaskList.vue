<template>
  <div class="task-list-container">
    <h2>Lista de Tareas</h2>
    <button @click="showAddTaskModal">Agregar Tarea</button>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <h4>{{ task.titulo }}</h4>
        <p>{{ task.descripcion }}</p>
        <p>Fecha de vencimiento: {{ task.fechaVencimiento }}</p>
        <p>Estado: {{ task.estado }}</p>
        <button @click="deleteTask(task.id)">Eliminar</button>
      </li>
    </ul>
    <add-task-modal v-if="isModalVisible" @close="isModalVisible = false" @task-added="fetchTasks" />
  </div>
</template>

<script>
import axios from 'axios';
import AddTaskModal from './AddTaskModal.vue'; // Componente para agregar tareas

export default {
  data() {
    return {
      tasks: [],
      isModalVisible: false,
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get('http://localhost:5000/tasks', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        this.tasks = response.data;
      } catch (error) {
        alert('Error al obtener las tareas');
      }
    },
    async deleteTask(taskId) {
      try {
        await axios.delete(`http://localhost:5000/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        this.fetchTasks(); // Refrescar la lista
      } catch (error) {
        alert('Error al eliminar la tarea');
      }
    },
    showAddTaskModal() {
      this.isModalVisible = true;
    },
  },
  created() {
    this.fetchTasks();
  },
  components: {
    AddTaskModal,
  },
};
</script>

<style>
.task-list-container {
  max-width: 600px;
  margin: auto;
}
button {
  margin: 1rem 0;
}
</style>
