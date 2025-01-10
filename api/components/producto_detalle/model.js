import { Model, DataTypes } from 'sequelize';
import { PRODUCTO_TABLE } from '../producto/model.js';
import { DETALLE_TABLE } from '../detalle/model.js';

const PRODUCTO_DETALLE_TABLE = 'Producto_Detalle';

const ProductoDetalleSchema = {
  id_producto_detalle: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PRODUCTO_TABLE,
      key: 'id_producto',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  id_detalle: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: DETALLE_TABLE,
      key: 'id_detalle',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
};

class Producto_Detalle extends Model {
  static associate(models) {
    this.belongsTo(models.Producto, {
      as: 'producto',
      foreignKey: 'id_producto',
      targetKey: 'id_producto',
    });
    this.belongsTo(models.Detalle, {
      as: 'detalle',
      foreignKey: 'id_detalle',
      targetKey: 'id_detalle',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTO_DETALLE_TABLE,
      modelName: 'Producto_Detalle',
      timestamps: false,
    };
  }
}

export { PRODUCTO_DETALLE_TABLE, ProductoDetalleSchema, Producto_Detalle };
