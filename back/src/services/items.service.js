const db = require('../../config/db');

class ItemsService {

    getAllItems(){
        const query = 'select * from items';
        return new Promise( ( resolve,reject ) => {
            db.query(query, ( err, response ) => {
                if( err ) {
                    console.log('[SERVICES-ITEMS] getAllItems ERROR', err);
                    reject( err );
                }else{
                    resolve( response.rows );
                }

            });
        })
    }
    
    getItem( id ){
        const query = `select * from items where item_id='${ id }'`;
        return new Promise( ( resolve,reject ) => {
            db.query(query, ( err, response ) => {
                if( err ) {
                    console.log('[SERVICES-ITEMS] getItem ERROR', err);
                    reject( err );
                }else{
                    resolve( response.rows );
                }
            });
        });
    }

    createItem( item ) {
        const query = `insert into items (seller_id, name, description, price, status_id, shipping_way_id, category_id) values ('${ item.sellerId }', '${ item.name }', '${ item.description }', '${ item.price }', '${ item.statusId }', '${ item.shippingWay}', '${ item.categoryId }')`;
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

    getItemsStatuses() {
        const query = 'select * from statuses';
        return new Promise( ( resolve,reject ) => {
            db.query(query, ( err, response ) => {
                if( err ) {
                    console.log('[SERVICES-ITEMS] getItemStatuses ERROR', err);
                    reject( err );
                }else{
                    resolve( response.rows );
                }
            });
        });
    }

    getItemsCategories() {
        const query = 'select * from categories';
        return new Promise( ( resolve,reject ) => {
            db.query(query, ( err, response ) => {
                if( err ) {
                    console.log('[SERVICES-ITEMS] getItemCategories ERROR', err);
                    reject( err );
                }else{
                    resolve( response.rows );
                }
            });
        });
    }

    getItemOffers( id ) {
        const query = `select * from items_offers where item_id='${ id }'`;
        return new Promise( ( resolve,reject ) => {
            db.query(query, ( err, response ) => {
                if( err ) {
                    console.log('[SERVICES-ITEMS] getItemOffers ERROR', err);
                    reject( err );
                }else{
                    resolve( response.rows );
                }
            });
        });
    }

    createItemOffer( id, offer ) {
        const query = `insert into items_offers (item_id, user_id, offer_amount) values ('${ id }', '${ offer.userId }', '${ offer.offerAmount }')`;
        return new Promise( ( resolve,reject ) => {
            db.query(query, ( err, response ) => {
                if( err ) {
                    console.log('[SERVICES-ITEMS] createItemOffer ERROR', err);
                    reject( err );
                }else{
                    resolve( response.rows );
                }
            });
        });
    }
}

module.exports = ItemsService;