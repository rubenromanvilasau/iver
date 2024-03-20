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
                        item: true,
                    }
                },
            }
        });

        return orders;
    }
    
    async getByCheckoutId( id ) {
        return prisma.order.findUnique({
            where: { checkout_id: id },
            include: {
                offer: {
                    include: {
                        user: true, 
                        item: {
                            include: {
                                shippingWay: true,
                                seller: true,
                            },
                        },
                    }
                },
            }
        });
    }
    
    async update( id, data ) {
        return prisma.order.update({
            where: { order_id: id },
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