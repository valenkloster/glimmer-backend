// models/producto_tono.js
import { Model, DataTypes } from 'sequelize';
const PRODUCTO_TONO_TABLE = 'Producto_Tono';

const ProductoTonoSchema = {
  id_producto_tono: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  tono_nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  tono_color: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isHexadecimal(value) {
        const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
        if (!hexColorRegex.test(value)) {
          throw new Error('Color must be a valid hexadecimal value');
        }
      },
    },
  },
};

class ProductoTono extends Model {
  static associate(models) {
    this.hasMany(models.ProductoDetalleTono, {
      as: 'detallesTonos',
      foreignKey: 'id_producto_tono',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTO_TONO_TABLE,
      modelName: 'ProductoTono',
      timestamps: false,
    };
  }
}

export { PRODUCTO_TONO_TABLE, ProductoTonoSchema, ProductoTono };
