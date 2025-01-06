import { Model, DataTypes } from 'sequelize';

const CARRITO_TABLE = 'Carrito';

const CarritoSchema = {
  id_carrito: {
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
};

class Carrito extends Model {
  static associate(models) {
    this.belongsTo(models.Cliente, {
      as: 'cliente',
      foreignKey: 'id_cliente',
    });
    this.hasMany(models.Carrito_Detalle, {
      as: 'detalles',
      foreignKey: 'id_carrito',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CARRITO_TABLE,
      modelName: 'Carrito',
      timestamps: false,
    };
  }
}

export { CARRITO_TABLE, CarritoSchema, Carrito };
