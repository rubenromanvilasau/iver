const ItemsService = require('../services/item.service');
const itemsService = new ItemsService();

class ItemController {

    async getAll( req, res ) {
        try {

            const { category, status, keyword, page, pageSize } = req.query;

            const filters = { category, status, keyword };

            console.log('filters', filters);

            const items = await itemsService.getAll(filters, page, pageSize);
            console.log('items', items);
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
            const itemOffers = await itemsService.createOffer( parseInt( id ) );
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
            const newItemOffer = await itemsService.createOffer( parseInt( id ), offer );
            res.status(201).send( newItemOffer );
        } catch ( err ) {
            console.log('[CONTROLLERS-ITEMS] createItemOffer ERROR', err);
            res.status(500).send( err );
        }
    }
}

module.exports = ItemController;