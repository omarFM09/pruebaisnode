<template>
    <div>
        <h1>Lista de Tareas</h1>
        <TaskForm
            v-if="editingTask"
            :task="editingTask"
            @saved="fetchTasks"
            @cancel="editingTask = null"
        />
        <TaskForm
            v-else
            @saved="fetchTasks"
        />
        <ul>
            <li v-for="task in tasks" :key="task.id">
                <h3>{{ task.titulo }}</h3>
                <p>{{ task.descripcion }}</p>
                <p>Estado: {{ task.estado }}</p>
                <button @click="editTask(task)">Editar</button>
                <button @click="deleteTask(task.id)">Eliminar</button>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import TaskForm from './TaskForm.vue';

export default {
    components: {
        TaskForm
    },
    data() {
        return {
            tasks: [],
            editingTask: null,
            usuarioId: null // Asigna el ID del usuario que inicia sesión
        };
    },
    methods: {
        async fetchTasks() {
            const response = await axios.get(`http://localhost:5000/api/tasks/${this.usuarioId}`);
            this.tasks = response.data;
        },
        async deleteTask(id) {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            this.fetchTasks();
        },
        editTask(task) {
            this.editingTask = { ...task };
        }
    },
    mounted() {
        this.fetchTasks();
    }
};
</script>
