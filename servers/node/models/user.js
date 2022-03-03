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
      User.hasMany(models.Task)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your name"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Must be in email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your password"
        },
        len: {
          args: [8],
          msg: "Please enter your password at least 6 chars"
        }
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your password"
        }
      }
    },
    
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your password"
        }
      }
    },
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