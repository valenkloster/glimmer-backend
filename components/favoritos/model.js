import { Model, DataTypes } from 'sequelize';

const FAVORITOS_TABLE = 'Favoritos';

const FavoritosSchema = {
  id_favoritos: {
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
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Producto',
      key: 'id_producto',
    },
  },
};

class Favoritos extends Model {
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
      tableName: FAVORITOS_TABLE,
      modelName: 'Favoritos',
      timestamps: false,
    };
  }
}

export { FAVORITOS_TABLE, FavoritosSchema, Favoritos };
