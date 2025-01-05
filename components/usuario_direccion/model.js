import { Model, DataTypes } from 'sequelize';

const USUARIO_DIRECCION_TABLE = 'Usuario_Direccion';

const UsuarioDireccionSchema = {
  id_usuario_direccion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
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

class Usuario_Direccion extends Model {
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
      tableName: USUARIO_DIRECCION_TABLE,
      modelName: 'Usuario_Direccion',
      timestamps: false,
    };
  }
}

export { USUARIO_DIRECCION_TABLE, UsuarioDireccionSchema, Usuario_Direccion };
