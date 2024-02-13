const { prisma } = require('../db.js');

class OrderService {

    async create( data ) {
        return prisma.order.create({ data });
    }
    
    async getAll() {
        const orders = await prisma.order.findMany({
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
        return prisma.order.findUnique({
            where: { order_id }
        });
    }
    
    async update( id, data ) {
        return prisma.order.update({
            where: { order_id },
            data
        });
    }
    
    async delete( id ) {
        return prisma.order.delete({
            where: { order_id }
        });
    }

};

module.exports = OrderService;