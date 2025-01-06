import { Model, DataTypes } from 'sequelize';

const CARRITO_DETALLE_TABLE = 'Carrito_Detalle';

const CarritoDetalleSchema = {
  id_carrito_detalle: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_carrito: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_detalle: {
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

class Carrito_Detalle extends Model {
  static associate(models) {
    this.belongsTo(models.Carrito, {
      as: 'carrito',
      foreignKey: 'id_carrito',
    });
    this.belongsTo(models.Detalle, {
      as: 'detalle',
      foreignKey: 'id_detalle',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CARRITO_DETALLE_TABLE,
      modelName: 'Carrito_Detalle',
      timestamps: false,
    };
  }
}

export { CARRITO_DETALLE_TABLE, CarritoDetalleSchema, Carrito_Detalle };
