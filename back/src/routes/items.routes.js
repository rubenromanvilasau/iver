const express = require('express');
const router = express.Router();
const db = require('../../config/db');

const ItemController = require('../controllers/item.controller');
const itemController = new ItemController();

const test = async( req, res ) => {
    db.query('select * from users', ( err, response ) => {
        if( err ) throw err;
        res.send( response.rows );
    });
}

router.get('/', itemController.getAll);
router.get('/:id/offers', itemController.getOffers);
router.get('/:id', itemController.getById);
router.post('/offer/:id', itemController.createOffer);
router.post('/create', itemController.create);
router.delete('/', test);
router.put('/', test);
router.patch('/', test);

module.exports = router;
