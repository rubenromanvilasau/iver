const express = require('express');
const router = express();

const usersRoutes = require('./users.routes');
const itemsRoutes = require('./items.routes');
const statusRoutes = require('./statuses.routes');
const categoriesRoutes = require('./categories.routes');
const shippingWaysRoutes = require('./shipping-ways.routes');

router.use('/users', usersRoutes);
router.use('/items', itemsRoutes);
router.use('/statuses', statusRoutes);
router.use('/categories', categoriesRoutes);
router.use('/shipping-ways', shippingWaysRoutes);

module.exports = router;