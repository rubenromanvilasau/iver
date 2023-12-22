const db = require('../../config/db');
const UsersService = require('./users.service');
const usersService = new UsersService();
const { socketIo, io, emitToAll } = require('../../websocket');
const { prisma } = require('../db.js'); 
class ItemsService {

    getAllItems(){

        return prisma.Item.findMany({
            include: {
                seller: true,
                shippingWay: true,
                category: true,
                status: true,
                images: true,
                offers: true,
                orders: true,
            }
        });
    }

    getItem( id ) {
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
                orders: true,
            }
        });
    }

    createItem( item ) {
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
                ends_at: new Date(),
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

    getItemsStatuses() {
        return prisma.ItemStatuses.findMany();
    }

    getItemsCategories() {
        return prisma.Category.findMany();
    }

    getItemOffers( id ) {
        return prisma.ItemOffers.findFirst({
            where: {
                item_id: id,
            },
            orderBy: {
                offer_date: 'desc'
            }
        });
    }

    //TODO HANDLE SOCKET
    createItemOffer( id, offer ) {
        return prisma.ItemOffers.create({
            data: {
                amount: offer.amount,
                seller: {
                    connect: {
                        rut: offer.userId
                    }
                },
                item: {
                    connect: {
                        item_id: id,
                    }
                }
            }
        });
    }
}

module.exports = ItemsService;