'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TaskHistories.init({
    title: DataTypes.STRING,
    task_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TaskHistories',
  });
  return TaskHistories;
};