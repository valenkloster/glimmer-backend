import { Model, DataTypes } from 'sequelize';

const PAIS_TABLE = 'Pais';

const PaisSchema = {
  id_pais: {
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
};

class Pais extends Model {
  static associate(models) {
    this.hasMany(models.Provincia, {
      as: 'provincias',
      foreignKey: 'id_pais',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PAIS_TABLE,
      modelName: 'Pais',
      timestamps: false,
    };
  }
}

export { PAIS_TABLE, PaisSchema, Pais };
