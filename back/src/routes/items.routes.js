const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ItemController = require('../controllers/item.controller');
const itemController = new ItemController();

// Configuración de multer
const storage = multer.diskStorage({
    destination: 'items-photos/',
    filename: function (req, file, cb) {
        // Genera un nombre único para el archivo con la extensión original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });

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
