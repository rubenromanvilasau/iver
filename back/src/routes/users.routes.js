const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

const test = ( req, res ) => {
    res.send('testing');
}

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.delete('/', test);
router.put('/update/:id', userController.update);
router.patch('/update/:id', userController.update);

module.exports = router;


