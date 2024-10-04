<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" v-model="titulo" placeholder="Título" required />
        <textarea v-model="descripcion" placeholder="Descripción"></textarea>
        <input type="date" v-model="fecha_vencimiento" />
        <select v-model="estado">
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En Progreso</option>
            <option value="completada">Completada</option>
        </select>
        <button type="submit">{{ editing ? 'Actualizar Tarea' : 'Agregar Tarea' }}</button>
        <button v-if="editing" type="button" @click="$emit('cancel')">Cancelar</button>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    props: ['task'],
    data() {
        return {
            titulo: this.task ? this.task.titulo : '',
            descripcion: this.task ? this.task.descripcion : '',
            fecha_vencimiento: this.task ? this.task.fecha_vencimiento : '',
            estado: this.task ? this.task.estado : 'pendiente',
            editing: !!this.task
        };
    },
    methods: {
        async handleSubmit() {
            if (this.editing) {
                await axios.put(`http://localhost:5000/api/tasks/${this.task.id}`, {
                    titulo: this.titulo,
                    descripcion: this.descripcion,
                    fecha_vencimiento: this.fecha_vencimiento,
                    estado: this.estado
                });
            } else {
                await axios.post('http://localhost:5000/api/tasks', {
                    usuario_id: this.usuarioId, // Agrega el ID del usuario aquí
                    titulo: this.titulo,
                    descripcion: this.descripcion,
                    fecha_vencimiento: this.fecha_vencimiento,
                    estado: this.estado
                });
            }
            this.$emit('saved');
            this.resetForm();
        },
        resetForm() {
            this.titulo = '';
            this.descripcion = '';
            this.fecha_vencimiento = '';
            this.estado = 'pendiente';
        }
    }
};
</script>
