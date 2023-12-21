const db = require('../../config/db');
const UsersService = require('./users.service');
const usersService = new UsersService();
const { socketIo, io, emitToAll } = require('../../websocket');
const { prisma } = require('../db.js'); 
class ItemsService {

    getAllItems(){
        const query = `SELECT *, sw.name AS shipping_way, s.name AS status, c."name" AS category
            FROM items
            INNER JOIN shipping_ways sw ON items.shipping_way_id = sw.shipping_way_id
            INNER JOIN items_statuses s ON items.status_id = s.status_id
            INNER JOIN categories c ON items.category_id = c.category_id`;
        return new Promise( ( resolve,reject ) => {
            db.query(query, async( err, response ) => {
                if( err ) {
                    console.log('[SERVICES-ITEMS] getAllItems ERROR', err);
                    reject( err );
                }else{
                    const proms = [];
                    for( let item of response.rows ) {

                        const userProm = new Promise( async( resolve, reject ) => {
                            const user = await usersService.getUser( item.seller_id )
                                            .catch( err => reject( err ) );
                            item.seller = user[0];
                            resolve( item );
                        });

                        const itemOffersProm = new Promise( async( resolve, reject ) => {
                            const offers = await this.getItemOffers( item.item_id )
                                                .catch( err => reject( err ) );
                            item.offers = offers;
                            resolve( item );
                        });

                        const itemImagesProm = new Promise( async( resolve, reject ) => {
                            const images = await this.getItemImages( item.item_id )
                                                .catch( err => reject( err ) );
                            item.images = images;
                            resolve( item );
                        
                        });

                        proms.push( itemOffersProm, itemImagesProm, userProm );
                    }
                    await Promise.all( proms );
                    resolve( response.rows );
                }

            });
        })
    }
    
    getItem( id ){
        const query = `SELECT *, sw.name AS shipping_way, s.name AS status, c."name" AS category
            FROM items 
            INNER JOIN shipping_ways sw ON items.shipping_way_id = sw.shipping_way_id
            INNER JOIN items_statuses s ON items.status_id = s.status_id
            INNER JOIN categories c ON items.category_id = c.category_id
            where items.item_id = ${ id }`;
        return new Promise( ( resolve,reject ) => {
            db.query(query, async( err, response ) => {
                if( err ) {
                    reject( err );
                }else{

                    if( response.rows.length === 0 ) {
                        resolve( [] );
                        return;
                    }

                    const userProm = new Promise( async( resolve, reject ) => {
                        const user = await usersService.getUser( response.rows[0].seller_id )
                                        .catch( err => reject( err ) );
                        response.rows[0].seller = user[0];
                        resolve( response.rows[0] );
                    });

                    const itemOffersProm = new Promise( async( resolve, reject ) => {
                        const offers = await this.getItemOffers( response.rows[0].item_id )
                                            .catch( err => reject( err ) );
                        response.rows[0].offers = offers;
                        resolve( response.rows[0] );
                    });

                    const itemImagesProm = new Promise( async( resolve, reject ) => {
                        const images = await this.getItemImages( response.rows[0].item_id )
                                            .catch( err => reject( err ) );
                        response.rows[0].images = images;
                        resolve( response.rows[0] );
                    
                    });

                    await Promise.all( [ userProm, itemOffersProm, itemImagesProm ] );
                    resolve( response.rows );
                }
            });
        });
    }

    createItem( item ) {
        const query = `INSERT INTO items (seller_id, name, description, price, status_id, shipping_way_id, category_id, end_date) VALUES ('${ item.sellerId }', '${ item.name }', '${ item.description }', '${ item.price }', '${ item.statusId }', '${ item.shippingWay}', '${ item.categoryId }', ${new Date()})`;
        return new Promise( ( resolve,reject ) => {
            db.query(query, ( err, response ) => {
                
                if( err ) {
                    console.log('[SERVICES-ITEMS] createItem ERROR', err);
                    reject( err );
                }else{
                    resolve( response.rows );
                }
            });
        });
    }

    getItemImages( itemId ) {
        const query = `SELECT * FROM items_images WHERE item_id='${ itemId }'`;
        return new Promise( ( resolve,reject ) => {
            db.query(query, ( err, response ) => {
                if( err ) {
                    console.log('[SERVICES-ITEMS] getItemsImages ERROR', err);
                    reject( err );
                }else{
                    resolve( response.rows );
                }
            });
        });
    }

    getItemsStatuses() {
        return prisma.items_statuses.findMany();
    }

    getItemsCategories() {
        return prisma.categories.findMany();
    }

    getItemOffers( id ) {
        return prisma.items_offers.findFirst({
            where: {
                item_id: id,
            },
            orderBy: {
                offer_date: 'desc'
            }
        });
    }

    createItemOffer( id, offer ) {
        return prisma.items_offers.create({});
        const query = `INSERT INTO items_offers (item_id, user_id, amount) VALUES (${ id }, '${ offer.userId }', ${ offer.amount })`;
        return new Promise( ( resolve,reject ) => {
            db.query(query, ( err, response ) => {
                if( err ) {
                    console.log('[SERVICES-ITEMS] createItemOffer ERROR', err);
                    reject( err );
                }else{
                    emitToAll('newOffer', offer);
                    resolve( response.rows );
                }
            });
        });
    }
}

module.exports = ItemsService;