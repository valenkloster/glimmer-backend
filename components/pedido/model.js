import { Model, DataTypes } from 'sequelize';

const PEDIDO_TABLE = 'Pedido';

const PedidoSchema = {
  id_pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  monto_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  id_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_cliente_direccion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_estado_pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

class Pedido extends Model {
  static associate(models) {
    this.belongsTo(models.Cliente, {
      as: 'cliente',
      foreignKey: 'id_cliente',
    });
    this.belongsTo(models.Cliente_Direccion, {
      as: 'cliente_direccion',
      foreignKey: 'id_cliente_direccion',
    });
    this.belongsTo(models.Estado_Pedido, {
      as: 'estado',
      foreignKey: 'id_estado_pedido',
    });
    this.hasMany(models.Pedido_Detalle, {
      as: 'detalles',
      foreignKey: 'id_pedido',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PEDIDO_TABLE,
      modelName: 'Pedido',
      timestamps: false,
    };
  }
}

export { PEDIDO_TABLE, PedidoSchema, Pedido };
