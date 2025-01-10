import { Model, DataTypes } from 'sequelize';

const CLIENTE_DIRECCION_TABLE = 'Cliente_Direccion';

const ClienteDireccionSchema = {
  id_cliente_direccion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  id_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Cliente',
      key: 'id_cliente',
    },
  },
  id_direccion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Direccion',
      key: 'id_direccion',
    },
  },
};

class Cliente_Direccion extends Model {
  static associate(models) {
    this.belongsTo(models.Cliente, {
      as: 'cliente',
      foreignKey: 'id_cliente',
    });

    this.belongsTo(models.Direccion, {
      as: 'direccion',
      foreignKey: 'id_direccion',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CLIENTE_DIRECCION_TABLE,
      modelName: 'Cliente_Direccion',
      timestamps: false,
    };
  }
}

export { CLIENTE_DIRECCION_TABLE, ClienteDireccionSchema, Cliente_Direccion };
