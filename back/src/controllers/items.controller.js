const ItemsService = require('../services/items.service');
const itemsService = new ItemsService();

const getAllItems = async( req, res ) => {
    try {
        const items = await itemsService.getAllItems();
        res.status(200).send( items );
    } catch ( err ) {
        console.log('[CONTROLLERS-ITEMS] getAllItems ERROR', err);
        res.status(500).send( err );
    }
}

const getItem = async( req, res ) => {
    const { id } = req.params;
    try {
        const item = await itemsService.getItem( id );
        res.status(200).send( item );
    } catch ( err ) {
        console.log('[CONTROLLERS-ITEMS] getItem ERROR', err);
        res.status(500).send( err );
    }
}

const createItem = async( req, res ) => {
    const item = req.body;
    try {
        const newItem = await itemsService.createItem( item );
        res.status(201).send( newItem );
    } catch ( err ) {
        console.log('[CONTROLLERS-ITEMS] createItem ERROR', err);
        res.status(500).send( err );
    }
}

const getItemsStatuses = async( req, res ) => {
    try {
        const itemStatuses = await itemsService.getItemsStatuses();
        res.status(200).send( itemStatuses );
    } catch ( err ) {
        console.log('[CONTROLLERS-ITEMS] getItemStatuses ERROR', err);
        res.status(500).send( err );
    }
}

const getItemsCategories = async( req, res ) => {
    try {
        const itemCategories = await itemsService.getItemsCategories();
        res.status(200).send( itemCategories );
    } catch ( err ) {
        console.log('[CONTROLLERS-ITEMS] getItemCategories ERROR', err);
        res.status(500).send( err );
    }
}

const getItemOffers = async( req, res ) => {
    const { id } = req.params;
    try {
        const itemOffers = await itemsService.getItemOffers( parseInt( id ) );
        res.status(200).send( itemOffers );
    } catch ( err ) {
        console.log('[CONTROLLERS-ITEMS] getItemOffers ERROR', err);
        res.status(500).send( err );
    }
}

const createItemOffer = async( req, res ) => {
    const { id } = req.params;
    const offer = req.body;
    try {
        const newItemOffer = await itemsService.createItemOffer( id, offer );
        res.status(201).send( newItemOffer );
    } catch ( err ) {
        console.log('[CONTROLLERS-ITEMS] createItemOffer ERROR', err);
        res.status(500).send( err );
    }
}

module.exports = {
    getAllItems,
    getItem,
    createItem,
    getItemsStatuses,
    getItemOffers,
    getItemsCategories,
    createItemOffer,
};