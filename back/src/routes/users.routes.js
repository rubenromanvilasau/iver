const express = require('express');
const router = express.Router();

const { getAllUsers, register, login } = require('../controllers/users.controller');

const test = ( req, res ) => {
    res.send('testing');
}

router.get('/', test);
router.get('/all', getAllUsers);
router.post('/register', register);
router.post('/login', login);
router.delete('/', test);
router.put('/', test);
router.patch('/', test);

module.exports = router;


