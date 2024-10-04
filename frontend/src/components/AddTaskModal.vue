<template>
  <div>
    <h2>Add Task</h2>
    <form @submit.prevent="addTask">
      <input v-model="title" placeholder="Task Title" required />
      <textarea v-model="description" placeholder="Task Description"></textarea>
      <input v-model="dueDate" type="date" />
      <button type="submit">Add Task</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      dueDate: ''
    };
  },
  methods: {
    addTask() {
      // Implement your add task logic here
      console.log("Task added:", this.title, this.description, this.dueDate);
      // Reset form
      this.title = '';
      this.description = '';
      this.dueDate = '';
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
