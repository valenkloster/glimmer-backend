import { Model, DataTypes } from 'sequelize';

const CATEGORIA_TABLE = 'Categoria';

const CategoriaSchema = {
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  id_categoria_padre: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: CATEGORIA_TABLE,
      key: 'id_categoria',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Categoria extends Model {
  static associate(models) {
    this.belongsTo(models.Categoria, {
      as: 'categoriaPadre',
      foreignKey: 'id_categoria_padre',
    });

    this.hasMany(models.Categoria, {
      as: 'subcategorias',
      foreignKey: 'id_categoria_padre',
    });

    this.hasMany(models.Producto, {
      as: 'productos',
      foreignKey: 'id_categoria',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIA_TABLE,
      modelName: 'Categoria',
      timestamps: false,
    };
  }
}

export { CATEGORIA_TABLE, CategoriaSchema, Categoria };
