import { Model, DataTypes } from 'sequelize';
import { USER_TABLE } from '../user/model.js';

const CLIENTE_TABLE = 'Cliente';

const ClienteSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 32],
        msg: 'Name length must be between 2 and 32 characters',
      },
    },
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 32],
        msg: 'Name length must be between 2 and 32 characters',
      },
    },
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Cliente extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'id_user' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CLIENTE_TABLE,
      modelName: 'Cliente',
      timestamps: false,
    };
  }
}

export { CLIENTE_TABLE, ClienteSchema, Cliente };
