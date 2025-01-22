import { Model, DataTypes } from 'sequelize';

const PEDIDO_DETALLE_TABLE = 'Pedido_Detalle';

const PedidoDetalleSchema = {
  id_pedido_detalle: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
};

class Pedido_Detalle extends Model {
  static associate(models) {
    this.belongsTo(models.Pedido, {
      as: 'pedido',
      foreignKey: 'id_pedido',
    });
    this.belongsTo(models.Producto, {
      as: 'producto',
      foreignKey: 'id_producto',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PEDIDO_DETALLE_TABLE,
      modelName: 'Pedido_Detalle',
      timestamps: false,
    };
  }
}

export { PEDIDO_DETALLE_TABLE, PedidoDetalleSchema, Pedido_Detalle };
