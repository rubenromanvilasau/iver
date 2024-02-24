const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

const test = ( req, res ) => {
    res.send('testing');
}

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.get('/:id/items', userController.getItems);
router.get('/:id/addresses', userController.getAddresses);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/:id/addresses', userController.createAddress);
router.delete('/', test);
router.put('/update/:id', userController.update);
router.put('/update/preferences/:id', userController.updatePreferences);
router.patch('/update/:id', userController.update);

module.exports = router;


