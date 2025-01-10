import { Model, DataTypes } from 'sequelize';
import { PAIS_TABLE } from '../pais/model.js';

const PROVINCIA_TABLE = 'Provincia';

const ProvinciaSchema = {
  id_provincia: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  id_pais: {
    type: DataTypes.INTEGER,
    references: {
      model: PAIS_TABLE,
      key: 'id_pais',
    },
    allowNull: false,
  },
};

class Provincia extends Model {
  static associate(models) {
    this.belongsTo(models.Pais, {
      as: 'pais',
      foreignKey: 'id_pais',
    });
    this.hasMany(models.Localidad, {
      as: 'localidades',
      foreignKey: 'id_provincia',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROVINCIA_TABLE,
      modelName: 'Provincia',
      timestamps: false,
    };
  }
}

export { PROVINCIA_TABLE, ProvinciaSchema, Provincia };
