const ItemsService = require('../services/item.service');
const itemsService = new ItemsService();

class ItemController {

    async getAll( req, res ) {
        try {
            const { category, status, keyword, page, pageSize, orderBy, direction } = req.query;

            const filters = { category, status, keyword, orderBy, direction };

            console.log('filters', filters);

            const items = await itemsService.getAll(filters, page, pageSize);
            res.status(200).send( items );
        } catch ( err ) {
            console.log('[CONTROLLERS-ITEMS] getAllItems ERROR', err);
            res.status(500).send( err );
        }
    }
    
    async getById( req, res ) {
        const { id } = req.params;
        try {
            const item = await itemsService.getById( parseInt( id ) );
            res.status(200).send( item );
        } catch ( err ) {
            console.log('[CONTROLLERS-ITEMS] getItem ERROR', err);
            res.status(500).send( err );
        }
    }
    
    async create( req, res ) {
        const item = req.body;
        try {
            const newItem = await itemsService.create( item );
            res.status(201).send( newItem );
        } catch ( err ) {
            console.log('[CONTROLLERS-ITEMS] createItem ERROR', err);
            res.status(500).send( err );
        }
    }
    
    async getOffers( req, res ) {
        const { id } = req.params;
        try {
            const itemOffers = await itemsService.getItemOffers( parseInt( id ) );
            res.status(200).send( itemOffers );
        } catch ( err ) {
            console.log('[CONTROLLERS-ITEMS] getItemOffers ERROR', err);
            res.status(500).send( err );
        }
    }
    
    async createOffer( req, res ) {
        const { id } = req.params;
        const offer = req.body;
        try {

            const item = await itemsService.getById( parseInt( id ) );
            if( item.seller_id === offer.userId ) {
                return res.status(400).send({ message: 'You cannot offer your own item' });
            }

            if( item.ends_at < new Date() ) {
                return res.status(400).send({ message: 'This item has expired' });
            }

            const newItemOffer = await itemsService.createOffer( parseInt( id ), offer );
            res.status(201).send( newItemOffer );
        } catch ( err ) {
            console.log('[CONTROLLERS-ITEMS] createItemOffer ERROR', err);
            res.status(500).send( err );
        }
    }
}

module.exports = ItemController;