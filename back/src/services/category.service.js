const { prisma } = require("../db");

class CategoryService {
  getAll() {
    return prisma.category.findMany({
      orderBy:{
        name: 'asc'
      }
    });
  }
};

module.exports = CategoryService;

