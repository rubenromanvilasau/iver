const { prisma } = require("../db");

class StatusService {
  getAll() {
    return prisma.itemStatuses.findMany();
  }
};

module.exports = StatusService;