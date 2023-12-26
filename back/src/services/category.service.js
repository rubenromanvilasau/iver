const { prisma } = require("../db");

class CategoryService {
  getAll() {
    return prisma.Category.findMany();
  }
};

module.exports = CategoryService;

