const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'items-photos/' });

const ItemController = require('../controllers/item.controller');
const itemController = new ItemController();

const multerMiddleware = () => {

}

router.get('/', itemController.getAll);
router.get('/:id/offers', itemController.getOffers);
router.get('/:id', itemController.getById);
router.post('/:id/photos', upload.array('photos'), itemController.addPhotos);
router.post('/offer/:id', itemController.createOffer);
router.post('/create', itemController.create);
router.delete('/', (req, res) => { res.json({ message: 'DELETE /items'})});
router.put('/', (req, res) => { res.json({ message: 'PUT /items'})});
router.patch('/', (req, res) => { res.json({ message: 'PATCH /items'})});

module.exports = router;
