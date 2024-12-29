import boom from '@hapi/boom';
import sequelize from '../../libs/sequelize.js';
const { models } = sequelize;

class CategoryService {
  constructor() {}

  async create(data) {
    const category = await models.Categoria.create(data);
    return category;
  }

  async get() {
    const categories = await models.Categoria.findAll({
      include: [
        {
          model: models.Categoria,
          as: 'subcategorias',
          attributes: ['id_categoria', 'nombre'],
        },
      ],
    });
    return categories;
  }

  async getById(id) {
    const category = await models.Categoria.findByPk(id, {
      include: [
        {
          model: models.Categoria,
          as: 'subcategorias', // Incluye las subcategorías
          attributes: ['id_categoria', 'nombre'],
        },
      ],
    });
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async getParents() {
    const parents = await models.Categoria.findAll({
      where: { id_categoria_padre: null },
      include: [
        {
          model: models.Categoria,
          as: 'subcategorias',
          attributes: ['id_categoria', 'nombre'],
        },
      ],
    });
    return parents;
  }

  async getChildren(parentId) {
    const children = await models.Categoria.findAll({
      where: { id_categoria_padre: parentId },
    });
    if (!children) {
      throw boom.notFound('The category does not have children');
    }
    return children;
  }

  async update(id, changes) {
    const category = await this.getById(id);
    return await category.update(changes);
  }

  async delete(id) {
    const category = await this.getById(id);
    await category.destroy();
  }
}

export default CategoryService;
