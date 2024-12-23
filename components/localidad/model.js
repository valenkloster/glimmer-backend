import { Model, DataTypes } from 'sequelize';
import { PROVINCIA_TABLE } from '../provincia/model.js';

const LOCALIDAD_TABLE = 't_localidad';

const LocalidadSchema = {
  id_localidad: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_provincia: {
    type: DataTypes.INTEGER,
    references: {
      model: PROVINCIA_TABLE,
      key: 'id_provincia',
    },
    allowNull: false,
  },
};

class Localidad extends Model {
  static associate(models) {
    this.belongsTo(models.Provincia, {
      as: 'provincia',
      foreignKey: 'id_provincia',
    });
    this.hasMany(models.Direccion, {
      as: 'direcciones',
      foreignKey: 'id_localidad',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: LOCALIDAD_TABLE,
      modelName: 'Localidad',
      timestamps: false,
    };
  }
}

export { LOCALIDAD_TABLE, LocalidadSchema, Localidad };
