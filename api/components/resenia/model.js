import { Model, DataTypes } from 'sequelize';

const RESENIA_TABLE = 'Resenia';

const ReseniaSchema = {
  id_resenia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  puntaje: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
};

class Resenia extends Model {
  static associate(models) {
    this.belongsTo(models.Cliente, {
      as: 'cliente',
      foreignKey: 'id_cliente',
    });
    this.belongsTo(models.Producto, {
      as: 'producto',
      foreignKey: 'id_producto',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RESENIA_TABLE,
      modelName: 'Resenia',
      timestamps: false,
    };
  }
}

export { RESENIA_TABLE, ReseniaSchema, Resenia };
