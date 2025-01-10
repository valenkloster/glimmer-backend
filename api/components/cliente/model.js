import { Model, DataTypes } from 'sequelize';
import { USER_TABLE } from '../user/model.js';

const CLIENTE_TABLE = 'Cliente';

const ClienteSchema = {
  id_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
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
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id_user',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Cliente extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'id_user' });
    this.hasMany(models.Favoritos, {
      as: 'favoritos',
      foreignKey: 'id_cliente',
    });
    this.hasMany(models.Cliente_Direccion, {
      as: 'direcciones',
      foreignKey: 'id_cliente',
    });
    this.hasMany(models.Pedido, {
      as: 'pedidos',
      foreignKey: 'id_cliente',
    });
    this.hasOne(models.Carrito, {
      as: 'carrito',
      foreignKey: 'id_cliente',
    });
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
