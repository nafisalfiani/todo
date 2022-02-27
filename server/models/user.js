'use strict';
const {
  Model
} = require('sequelize');
const encryption = require('../helpers/encryption');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
  },
  {
    sequelize,
    modelName: 'User',
  });

  // Method 3 via the direct method
  User.beforeCreate(async (user, options) => {
    console.log(user, '>>>user');
    console.log(user.password, '>>>user');
    const encryptedPassword = await encryption.encrypt(user.password);
    user.password = encryptedPassword;
  });

  return User;
};