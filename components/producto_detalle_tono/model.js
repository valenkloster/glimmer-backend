import { Model, DataTypes } from 'sequelize';
import { PRODUCTO_DETALLE_TABLE } from '../producto_detalle/model.js';
import { PRODUCTO_TONO_TABLE } from '../producto_tono/model.js';

const PRODUCTO_DETALLE_TONO_TABLE = 'Producto_Detalle_Tono';

const ProductoDetalleTonoSchema = {
  id_producto_detalle_tono: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_producto_detalle: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PRODUCTO_DETALLE_TABLE,
      key: 'id_producto_detalle',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  id_producto_tono: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PRODUCTO_TONO_TABLE,
      key: 'id_producto_tono',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
};

class ProductoDetalleTono extends Model {
  static associate(models) {
    this.belongsTo(models.ProductoDetalle, {
      as: 'productoDetalle',
      foreignKey: 'id_producto_detalle',
    });
    this.belongsTo(models.ProductoTono, {
      as: 'productoTono',
      foreignKey: 'id_producto_tono',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTO_DETALLE_TONO_TABLE,
      modelName: 'ProductoDetalleTono',
      timestamps: false,
    };
  }
}

export {
  PRODUCTO_DETALLE_TONO_TABLE,
  ProductoDetalleTonoSchema,
  ProductoDetalleTono,
};
