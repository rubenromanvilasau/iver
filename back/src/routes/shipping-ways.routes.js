const express = require('express');
const router = express.Router();
const ShippingWayController = require('../controllers/shipping-way.controller');
const shippingWayController = new ShippingWayController();

router.get('/', shippingWayController.getAll);

module.exports = router;