import { Model, DataTypes } from 'sequelize';

const USER_TABLE = 'User';

const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['cliente', 'admin']],
    },
  },
  recoveryToken: {
    field: 'recovery_token',
    type: DataTypes.STRING,
    allowNull: true,
  },
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Cliente, {
      as: 'cliente',
      foreignKey: 'id_user',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    };
  }
}

export { USER_TABLE, UserSchema, User };
