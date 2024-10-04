const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

class Task extends Model {}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  fechaVencimiento: {
    type: DataTypes.DATE,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'en progreso', 'completada'),
    defaultValue: 'pendiente',
  },
}, { sequelize, modelName: 'task' });

User.hasMany(Task, { foreignKey: 'usuarioId' });
Task.belongsTo(User, { foreignKey: 'usuarioId' });

module.exports = Task;
