const { prisma } = require("../db");

class CategoryService {
  getAll() {
    return prisma.Category.findMany({
      orderBy:{
        name: 'asc'
      }
    });
  }
};

module.exports = CategoryService;

