const CategoryService = require('../services/category.service');
const categoryService = new CategoryService();

class CategoryController {

    async getAll(req, res) {
        try {
            const categories = await categoryService.getAll();
            res.status(200).send(categories);
        } catch (err) {
            console.log('[CONTROLLERS-CATEGORIES] getAllCategories ERROR', err);
            res.status(500).send(err);
        }
    }
}

module.exports = CategoryController;
