const express = require('express');
const router = express();

const userRoutes = require('./users.routes');
const itemRoutes = require('./items.routes');

router.use('/users', userRoutes);
router.use('/items', itemRoutes);

module.exports = router;