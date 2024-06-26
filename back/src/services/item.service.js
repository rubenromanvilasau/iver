const { socketIo, io, emitToAll } = require('../../websocket.js');
const { prisma } = require('../db.js'); 
class ItemsService {

    getAll( filters, page = 1, pageSize = 10 ) {

        const { category, status, keyword, orderBy, direction } = filters;

        const where = {};

        if( category ) {
            where.category = {
                category_id: category
            };
        }

        if( status ) {
            where.status = {
                status_id: status
            };
        }

        if( keyword ) {
            where.OR = [
                {  
                    description: {
                        contains: keyword,
                        mode: 'insensitive'
                    },
                },
                {
                    name: {
                        contains: keyword,
                        mode: 'insensitive'
                    
                    }
                }
            ];
        }

        const orderConfig = orderBy && direction ? { [orderBy]: direction } : {};

        return prisma.Item.findMany({
            where,
            include: {
                seller: true,
                shippingWay: true,
                category: true,
                status: true,
                images: true,
                offers: true,
            },
            orderBy: orderConfig,
            skip: ( page - 1 ) * pageSize,
            take: pageSize,
        });
    }

    getById( id ) {
        return prisma.Item.findFirst({
            where: {
                item_id: id,
            },
            include: {
                seller: true,
                shippingWay: true,
                category: true,
                status: true,
                images: true,
                offers: true,
            }
        });
    }

    create( item ) {
        return prisma.Item.create({
            data: {
                name:        item.name,
                price:       item.price,
                description: item.description,

                seller: {
                    connect: {
                        rut: item.sellerId
                    }
                },
                shippingWay: {
                    connect: {
                        shipping_way_id: item.shippingWayId
                    }
                },
                status: {
                    connect: {
                        status_id: item.statusId,
                    }
                },
                category: {
                    connect: {
                        category_id: item.categoryId
                    }
                },
                ends_at: item.endsAt,
            }
        })
    }

    getItemImages( itemId ) {
        return prisma.ItemImages.findFirst({
            where: {
                item_id: itemId
            }
        });
    }

    getItemOffers( id ) {
        return prisma.ItemOffers.findMany({
            where: {
                item_id: id,
            },
            include:{
                user: true,
            },
            orderBy: {
                created_at: 'desc'
            }
        });
    }

    async createOffer( id, offer ) {
        const newOffer = await prisma.ItemOffers.create({
            data: {
                amount: offer.amount,
                user: {
                    connect: {
                        rut: offer.userId
                    }
                },
                item: {
                    connect: {
                        item_id: id,
                    }
                },
            },
            include: {
                user: true,
            }
        });

        emitToAll('newOffer', newOffer);
    }
}

module.exports = ItemsService;