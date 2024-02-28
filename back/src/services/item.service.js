const { socketIo, io, emitToAll } = require('../../websocket.js');
const { prisma } = require('../db.js'); 
class ItemsService {

    async getAll( filters, page = 1, pageSize = 10 ) {

        const { category, status, keyword, orderBy, direction } = filters;

        const where = {};

        if( category ) {
            where.category = {
                category_id: parseInt( category )
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

        // const [data, count] = await this.prisma.$transaction([
            // this.prisma.model.findMany(),
            // this.prisma.model.count(),
        // ]);

        const [ data, count ] = await prisma.$transaction([
            prisma.item.findMany({
                where,
                include: {
                    seller: {
                        include: {
                            preferences: true,
                        },
                    },
                    shippingWay: true,
                    category: true,
                    status: true,
                    images: true,
                    offers: true,
                },
                orderBy: orderConfig,
                skip: ( page - 1 ) * pageSize,
                take: pageSize,
            }),
            prisma.item.count({
                where,
            })
        ]);

        return {
            data,
            count,
        }
    }

    getById( id ) {
        return prisma.item.findFirst({
            where: {
                item_id: id,
            },
            include: {
                seller: true,
                shippingWay: true,
                category: true,
                status: true,
                images: true,
                offers: {
                    orderBy:{
                        created_at: 'desc'
                    }
                },
            }
        });
    }

    create( item ) {
        return prisma.item.create({
            data: {
                name:        item.name,
                price:       item.price,
                description: item.description,
                // images: {
                //     createMany: {
                //         data: 
                //     }
                // },
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
        return prisma.itemImage.findFirst({
            where: {
                item_id: itemId
            }
        });
    }

    getItemOffers( id ) {
        return prisma.itemOffer.findMany({
            where: {
                item_id: id,
            },
            include: {
                user: true,
            },
            orderBy: {
                created_at: 'desc'
            }
        });
    }

    getUserItems( userId ) {
        return prisma.item.findMany({
            where: {
                seller_id: userId,
            },
            include: {
                seller: true,
                offers: true,
            },
            orderBy: {
                created_at: 'desc'
            }
        })
    }

    async createOffer( id, offer ) {
        const newOffer = await prisma.itemOffer.create({
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

        emitToAll('newOffer', id, newOffer);
    }


    //TODO FIX THIS, THERE'S A PROBLEM WITH CREATEMANY
    async addPhotos( id, images ) {
        const data = images.map( image => {
            return {
                image_url: image.path,
                item: {
                    connect: {
                        item_id: parseInt(id),
                    }
                }
            }
        });
        console.log('data', data);

        return prisma.itemImage.createMany({ data: data });
    }
}

module.exports = ItemsService;