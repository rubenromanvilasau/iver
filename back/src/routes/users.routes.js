const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

const test = ( req, res, next ) => {
    res.send('testing');
    next();
}

router.get('/', userController.getAll);
router.get('/email', userController.getByEmail);
router.get('/:id', userController.getById);
router.get('/:id/items', userController.getItems);
router.get('/:id/addresses', userController.getAddresses);
router.post('/recover-password', userController.recoverPassword);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/update-password/:id', userController.updatePassword);
router.post('/addresses', userController.createAddress);
router.delete('/:user_id/addresses/:id', userController.deleteAddress);
router.put('/update/:id', userController.update);
router.put('/update/preferences/:id', userController.updatePreferences);
router.patch('/update/:id', userController.update);
router.put('/addresses/:id', userController.updateAddress);

module.exports = router;


