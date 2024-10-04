const Task = require('../models/Task');

const createTask = async (req, res) => {
    const { titulo, descripcion, fechaVencimiento, estado } = req.body;
    const userId = req.user.id; // Asume que el ID del usuario se añade a la solicitud en el middleware de autenticación
    try {
      const task = await Task.create({ titulo, descripcion, fechaVencimiento, estado, usuarioId: userId });
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear la tarea' });
    }
};

const getTasks = async (req, res) => {
    const userId = req.user.id; // Asume que el ID del usuario se añade a la solicitud en el middleware de autenticación
    try {
      const tasks = await Task.findAll({ where: { usuarioId: userId } });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las tareas' });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fechaVencimiento, estado } = req.body;
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      
      task.titulo = titulo || task.titulo;
      task.descripcion = descripcion || task.descripcion;
      task.fechaVencimiento = fechaVencimiento || task.fechaVencimiento;
      task.estado = estado || task.estado;
  
      await task.save();
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar la tarea' });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      
      await task.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
