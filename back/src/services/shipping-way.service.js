const { prisma } = require('../db');

class ShippingWayService {
    
    getAll(){
        return prisma.shippingWay.findMany();
    }

}

module.exports = ShippingWayService;