const { prisma } = require('../db');

class ShippingWayService {
    
    getAll(){
        return prisma.ShippingWay.findMany();
    }

}

module.exports = ShippingWayService;