const express = require('express');
const router = express.Router();
const db = require('../../config/db');

const { 
    getAllItems, 
    getItem, 
    createItem, 
    getItemsStatuses,
    getItemsCategories,
    createItemOffer,
    getItemOffers
} = require('../controllers/items.controller');

const test = async( req, res ) => {
    db.query('select * from users', ( err, response ) => {
        if( err ) throw err;
        res.send( response.rows );
    });
}

router.get('/', getAllItems);
router.get('/statuses', getItemsStatuses);
router.get('/categories', getItemsCategories);
router.get('/:id/offers', getItemOffers);
router.get('/:id', getItem);
router.post('/offer/:id', createItemOffer);
router.post('/', test);
router.post('/create', createItem);
router.delete('/', test);
router.put('/', test);
router.patch('/', test);

module.exports = router;
