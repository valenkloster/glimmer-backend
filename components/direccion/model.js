import { Model, DataTypes } from 'sequelize';
import { LOCALIDAD_TABLE } from '../localidad/model.js';

const DIRECCION_TABLE = 'Direccion';

const DireccionSchema = {
  id_direccion: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departamento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  codigo_postal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_localidad: {
    type: DataTypes.INTEGER,
    references: {
      model: LOCALIDAD_TABLE,
      key: 'id_localidad',
    },
    allowNull: false,
  },
};

class Direccion extends Model {
  static associate(models) {
    this.belongsTo(models.Localidad, {
      as: 'localidad',
      foreignKey: 'id_localidad',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DIRECCION_TABLE,
      modelName: 'Direccion',
      timestamps: false,
    };
  }
}

export { DIRECCION_TABLE, DireccionSchema, Direccion };
