const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/category.controller');
const categoryController = new CategoryController();

router.get('/', categoryController.getAll);

module.exports = router;