const express = require('express');
const router = express.Router();

const StatusController = require('../controllers/status.controller');
const statusController = new StatusController();

router.get('/', statusController.getAll);

module.exports = router;