import { Model, DataTypes } from 'sequelize';

const ESTADO_PEDIDO_TABLE = 'Estado_Pedido';

const EstadoPedidoSchema = {
  id_estado_pedido: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

class Estado_Pedido extends Model {
  static associate(models) {
    this.hasMany(models.Pedido, {
      as: 'pedidos',
      foreignKey: 'id_estado_pedido',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESTADO_PEDIDO_TABLE,
      modelName: 'Estado_Pedido',
      timestamps: false,
    };
  }
}

export { ESTADO_PEDIDO_TABLE, EstadoPedidoSchema, Estado_Pedido };
