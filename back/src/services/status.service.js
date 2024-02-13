const { prisma } = require("../db");

class StatusService {
  getAll() {
    return prisma.itemStatus.findMany();
  }
};

module.exports = StatusService;