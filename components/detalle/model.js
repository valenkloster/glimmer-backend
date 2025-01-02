import { Model, DataTypes } from 'sequelize';

const DETALLE_TABLE = 'Detalle';  // Corregido el nombre de la tabla

const DetalleSchema = {
  id_detalle: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  tono_nombre: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  tono_color: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  tamanio: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

class Detalle extends Model {
  static associate(models) {
    this.belongsToMany(models.Producto, {
      through: models.ProductoDetalle,
      foreignKey: 'id_detalle',
      otherKey: 'id_producto',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DETALLE_TABLE,
      modelName: 'Detalle',
      timestamps: false,
    };
  }
}

export { DETALLE_TABLE, DetalleSchema, Detalle };
