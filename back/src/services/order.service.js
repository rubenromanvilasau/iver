const { prisma } = require('../db.js');

class OrderService {

    async create( data ) {
        return prisma.Order.create({ data });
    }
    
    async getAll() {
        const orders = await prisma.Order.findMany({
            include: {
                offer: {
                    include: {
                        user: true,
                    }
                },
            }
        });

        return orders;
    }
    
    async getById( id ) {
        return prisma.Order.findUnique({
            where: { order_id }
        });
    }
    
    async update( id, data ) {
        return prisma.Order.update({
            where: { order_id },
            data
        });
    }
    
    async delete( id ) {
        return prisma.Order.delete({
            where: { order_id }
        });
    }

};

module.exports = OrderService;